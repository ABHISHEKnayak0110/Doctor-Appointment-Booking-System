import { Injectable } from '@nestjs/common';
import { Appointment } from './modal/appointment.modal';
import { CancelAppointmentDto, CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { BaseException } from 'src/exceptions/baseExceptions';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'src/common/helper/helper';



@Injectable()
export class AppointmentService {
  private appointments: Appointment[] = [];
  private doctorsList = [
    {
      name: "Abhishek",
      availableSlots: [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 AM",
        "12:00 AM - 01:00 PM",
        "01:00 PM - 02:00 PM"
      ],
      bookedSlots: []
    },
    {
      name: "John",
      availableSlots: [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 AM",
        "12:00 AM - 01:00 PM",
        "01:00 PM - 02:00 PM"
      ],
      bookedSlots: []
    },
    {
      name: "Naina",
      availableSlots: [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 AM",
        "12:00 AM - 01:00 PM",
        "01:00 PM - 02:00 PM"
      ],
      bookedSlots: []
    },
    {
      name: "Batra",
      availableSlots: [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 AM",
        "12:00 AM - 01:00 PM",
        "01:00 PM - 02:00 PM"
      ],
      bookedSlots: []
    }
  ]

  createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {

      const { doctorName, timeSlot, email, firstName, lastName } = createAppointmentDto;

      //check dr 
      this.checkValidDoctor(doctorName)
      // check if an appointment already exists for the doctor and time slot
      const existingAppointment = this.appointments.find(
        appointment => appointment.doctorName === doctorName && appointment.timeSlot === timeSlot
      );


      const availableSlots = this.getAvailableSlotsByDoctorName(doctorName)
      if (!availableSlots?.includes(timeSlot)) {
        throw new BaseException(
          {
            message: `This time slot is not available. Available slots ${availableSlots}`,
            operation: "Create Appointment",
            errorCode: "APPOINTMENT-CREATE-001",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }
      if (!isEmpty(existingAppointment)) {
        throw new BaseException(
          {
            message: `This time slot is already booked. Available slots ${availableSlots}`,
            operation: "Create Appointment",
            errorCode: "APPOINTMENT-CREATE-001",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }

      const newAppointment = new Appointment(doctorName, timeSlot, firstName, lastName, email, uuidv4() , new Date().toISOString());
      this.appointments.push(newAppointment);
      this.manageSlot(doctorName, "BOOK", timeSlot)
    
      return { message : "Appointment booked successfully !" , data: newAppointment };

    } catch (error) {
      throw new BaseException(
        {
          message: error?.message || "Something went wrong",
          operation: "Create Appointment",
          errorCode: error?.errorCode || "APPOINTMENT-CREATE-002",
          statusCode: 500,
          source: AppointmentService.name
        }
      )
    }
  }

  findPatientAppointment(email: string) {
    try {
      const appointments = this.appointments.filter(appointment => appointment.email === email);

      if (appointments.length === 0) {
        throw new BaseException(
          {
            message: "No appointments found for this email.",
            operation: "Find Patient Appointment",
            errorCode: "APPOINTMENT-PATIENT-GET-001",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }

      return { data: appointments }
    } catch (error) {
      throw new BaseException(
        {
          message: error?.message || "Something went wrong",
          operation: "Find Patient Appointment",
          errorCode: error?.errorCode || "APPOINTMENT-PATIENT-GET-002",
          statusCode: 500,
          source: AppointmentService.name
        }
      )
    }

  }

  findDoctorsAppointment(doctorName: string) {
    try {
      this.checkValidDoctor(doctorName)
      const data = this.appointments.filter(appointment => appointment.doctorName === doctorName);
      return { data }
    } catch (error) {
      throw new BaseException(
        {
          message: error?.message || "Something went wrong",
          operation: "Find Doctors Appointment",
          errorCode: error?.errorCode || "APPOINTMENT-DOCTOR-GET-002",
          statusCode: error?.statusCode || 500,
          source: AppointmentService.name
        }
      )
    }
  }

  updateAppointment(updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const { email, originalTimeSlot, newTimeSlot } = updateAppointmentDto

      const appointment = this.appointments.filter(appointment => appointment.email === email && appointment?.timeSlot === originalTimeSlot);
      if (isEmpty(appointment)) {
        throw new BaseException(
          {
            message: "No appointments found for this email and slot.",
            operation: "Update Patient Appointment",
            errorCode: "UPDATE-APPOINTMENT-001",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }

      //check valid slots 
      const availableSlots = this.getAvailableSlotsByDoctorName(appointment[0]?.doctorName)
      if (!availableSlots?.includes(newTimeSlot)) {
        throw new BaseException(
          {
            message: `This time slot is not available. Available slots ${availableSlots}`,
            operation: "Create Appointment",
            errorCode: "APPOINTMENT-CREATE-004",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }

      //checkAvailibility for new slot 
      const existingAppointmentForNewSlot = this.appointments.find(
        appointment => appointment.doctorName === appointment?.[0]?.doctorName && appointment.timeSlot === newTimeSlot
      );



      if (!isEmpty(existingAppointmentForNewSlot)) {
        throw new BaseException(
          {
            message: `${newTimeSlot} is not available . Available slots are ${availableSlots}`,
            operation: "Update Patient Appointment",
            errorCode: "UPDATE-APPOINTMENT-003",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }
      const updatedData = this.appointments.map((appointment) => {
        if (appointment.email === email && appointment?.timeSlot === originalTimeSlot) {
          appointment.timeSlot = newTimeSlot,
          appointment.updatedDate = new Date().toISOString()
        }
        return appointment
      });
      this.appointments = updatedData
      this.manageSlot(appointment[0]?.doctorName, "CANCEL", originalTimeSlot)
      this.manageSlot(appointment[0]?.doctorName, "BOOK", newTimeSlot)
      return {
        message : "Appointment updated successfully",
        data : {
          ...appointment[0],
          timeSlot: newTimeSlot
        }
       
      }

    } catch (error) {
      throw new BaseException(
        {
          message: error?.message || "Something went wrong",
          operation: "Update Patient Appointment",
          errorCode: error?.errorCode || "UPDATE-APPOINTMENT-002",
          statusCode: 500,
          source: AppointmentService.name
        }
      )
    }

  }

  cancelAppointement(patientData: CancelAppointmentDto) {
    try {
      const { email, timeSlot } = patientData
      const appointmentIndex = this.appointments.findIndex(appointment =>
        appointment.email === email && appointment.timeSlot === timeSlot
      );

      if (appointmentIndex === -1) {
        throw new BaseException(
          {
            message: "Patient Details not found ",
            operation: "Cancel  Patient Appointment",
            errorCode: "CANCEL-APPOINTMENT-001",
            statusCode: 400,
            source: AppointmentService.name
          }
        )
      }

      // Remove appointment from in-memory store

      this.manageSlot(this.appointments?.[appointmentIndex]?.doctorName, "CANCEL", timeSlot)
      this.appointments.splice(appointmentIndex, 1);

      return {
        message: "Appointment cancel successfully ",
        emial: patientData?.email,
        timeSlot: patientData?.timeSlot
      }
      // this.manageSlot(this.appointments?.[appointmentIndex]?.doctorName , "CANCEL" , timeSlot )

    } catch (error) {
      throw new BaseException(
        {
          message: error?.message || "Something went wrong",
          operation: "Cancel  Patient Appointment",
          errorCode: error?.errorCode || "CANCEL-APPOINTMENT-002",
          statusCode: 500,
          source: AppointmentService.name
        }
      )
    }
  }

  getAvailableSlotsByDoctorName(name: string) {
    return this.doctorsList?.filter((doctor) => doctor?.name === name)?.[0]?.availableSlots
  }
  checkValidDoctor(name: string) {
    const data = this.doctorsList?.filter((doctor) => doctor?.name === name)
    if (isEmpty(data)) {
      throw new BaseException(
        {
          message: "Not a Valid Doctor",
          operation: "Check Valid Doctor",
          errorCode: "CHECK-VALID-DOCTOR-001",
          statusCode: 400,
          source: "Doctor List"
        }
      )
    }
    return true
  }
  manageSlot(doctorName: string, type: 'BOOK' | 'CANCEL', slot: string): string {
    const doctor = this.doctorsList.find(doc => doc.name === doctorName);

    if (!doctor) {
      throw new BaseException(
        {
          message: "Not a Valid Doctor",
          operation: "Check Valid Doctor",
          errorCode: "CHECK-VALID-DOCTOR-002",
          statusCode: 400,
          source: "Manage Slot"
        }
      )
    }

    if (type === 'BOOK') {
      const slotIndex = doctor.availableSlots.indexOf(slot);

      if (slotIndex !== -1) {
        doctor.availableSlots.splice(slotIndex, 1);
        doctor.bookedSlots.push(slot);

        return `Slot ${slot} successfully booked for Dr. ${doctorName}`;
      } else {
        return `Slot ${slot} is not available for Dr. ${doctorName}`;
      }
    } else if (type === 'CANCEL') {
      const slotIndex = doctor.bookedSlots.indexOf(slot);
      if (slotIndex !== -1) {
        doctor.bookedSlots.splice(slotIndex, 1);
        doctor.availableSlots.push(slot);
        return `Slot ${slot} successfully canceled for Dr. ${doctorName}`;
      } else {
        return `Slot ${slot} is not currently booked for Dr. ${doctorName}`;
      }
    }
  }
}

