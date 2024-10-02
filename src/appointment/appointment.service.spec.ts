import { BaseException } from '../exceptions/baseExceptions';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, CancelAppointmentDto } from './dto/appointment.dto';


describe('AppointmentService', () => {
  let appointmentService: AppointmentService;

  beforeEach(() => {
    appointmentService = new AppointmentService();
  });

  describe('createAppointment', () => {
    it('should create an appointment successfully', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = appointmentService.createAppointment(createAppointmentDto);
      expect(result).toHaveProperty('message', 'Appointment booked successfully !');
      expect(result).toHaveProperty('data');
    });

    it('should throw an error if time slot is not available', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      // Book the slot first
      appointmentService.createAppointment(createAppointmentDto);

      // Try to book the same slot again
      expect(() => appointmentService.createAppointment(createAppointmentDto)).toThrow(BaseException);
    });

    it('should throw an error if doctor is invalid', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'InvalidDoctor',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      expect(() => appointmentService.createAppointment(createAppointmentDto)).toThrow(BaseException);
    });
  });

  describe('findPatientAppointment', () => {
    it('should return patient appointments', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      appointmentService.createAppointment(createAppointmentDto);

      const result = appointmentService.findPatientAppointment('test@example.com');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveLength(1);
    });

    it('should throw an error if no appointments are found', () => {
      expect(() => appointmentService.findPatientAppointment('nonexistent@example.com')).toThrow(BaseException);
    });
  });

  describe('findDoctorsAppointment', () => {
    it('should return doctor appointments', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      appointmentService.createAppointment(createAppointmentDto);

      const result = appointmentService.findDoctorsAppointment('Abhishek');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveLength(1);
    });

    it('should throw an error if the doctor is invalid', () => {
      expect(() => appointmentService.findDoctorsAppointment('InvalidDoctor')).toThrow(BaseException);
    });
  });

  describe('updateAppointment', () => {
    it('should update an appointment successfully', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      appointmentService.createAppointment(createAppointmentDto);

      const updateAppointmentDto: UpdateAppointmentDto = {
        email: 'test@example.com',
        originalTimeSlot: '10:00 AM - 11:00 AM',
        newTimeSlot: '11:00 AM - 12:00 AM',
      };

      const result = appointmentService.updateAppointment(updateAppointmentDto);
      expect(result).toHaveProperty('message', 'Appointment updated successfully');
      expect(result.data).toHaveProperty('timeSlot', '11:00 AM - 12:00 AM');
    });

    it('should throw an error if no appointment is found to update', () => {
      const updateAppointmentDto: UpdateAppointmentDto = {
        email: 'test@example.com',
        originalTimeSlot: 'NonExistentSlot',
        newTimeSlot: '11:00 AM - 12:00 AM',
      };

      expect(() => appointmentService.updateAppointment(updateAppointmentDto)).toThrow(BaseException);
    });
  });

  describe('cancelAppointement', () => {
    it('should cancel an appointment successfully', () => {
      const createAppointmentDto: CreateAppointmentDto = {
        doctorName: 'Abhishek',
        timeSlot: '10:00 AM - 11:00 AM',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      appointmentService.createAppointment(createAppointmentDto);

      const cancelAppointmentDto: CancelAppointmentDto = {
        email: 'test@example.com',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      const result = appointmentService.cancelAppointement(cancelAppointmentDto);
      expect(result).toHaveProperty('message', 'Appointment cancel successfully ');
    });

    it('should throw an error if no appointment is found to cancel', () => {
      const cancelAppointmentDto: CancelAppointmentDto = {
        email: 'test@example.com',
        timeSlot: 'NonExistentSlot',
      };

      expect(() => appointmentService.cancelAppointement(cancelAppointmentDto)).toThrow(BaseException);
    });
  });
});
