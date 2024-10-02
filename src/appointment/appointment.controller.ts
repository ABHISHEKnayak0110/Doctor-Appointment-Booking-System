import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, GetAppointmentDto, GetAppointmentsByDoctorDto, CancelAppointmentDto } from './dto/appointment.dto';


@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/book')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get('/patient')
  findPatientAppointment(@Query() query: GetAppointmentDto ) {
    return this.appointmentService.findPatientAppointment(query?.email);
  }

  @Get('/doctor')
  findDoctorsAppointment(@Query() query: GetAppointmentsByDoctorDto) {
    return this.appointmentService.findDoctorsAppointment(query?.doctorName);
  }

  @Patch('/update')
  updateAppointment(@Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.updateAppointment(updateAppointmentDto);
  }

  @Delete('cancel')
  cancelAppointement(@Body() details : CancelAppointmentDto) {
    return this.appointmentService.cancelAppointement(details);
  }
}
