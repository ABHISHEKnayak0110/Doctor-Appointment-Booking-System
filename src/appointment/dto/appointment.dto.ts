import { IsString,IsNotEmpty , IsEmail} from 'class-validator';
import { IsTimeSlot } from '../customValidator/time-slot.validator';


export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    doctorName: string;

    @IsString()
    @IsNotEmpty()
    @IsTimeSlot()
    timeSlot: string;
  }
  
  // update-appointment.dto.ts
  export class UpdateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsTimeSlot()
    originalTimeSlot: string;

    @IsString()
    @IsNotEmpty()
    @IsTimeSlot()
    newTimeSlot: string;
  }

  export class GetAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }
  
  export class GetAppointmentsByDoctorDto {
    @IsString()
    @IsNotEmpty()
    doctorName: string;
  }

  export class CancelAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsTimeSlot()
    timeSlot: string; // Example: "10:00 AM - 11:00 AM"
  }
  
  