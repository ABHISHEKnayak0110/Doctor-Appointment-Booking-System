export class Appointment {
    doctorName: string;
    timeSlot: string;
    firstName: string;
    lastName: string;
    email: string;
    bookingId : string
    date : string
    updatedDate : string

    constructor(doctorName: string, timeSlot: string, firstName: string, lastName: string, email: string , bookingId : string , date ?: string , updatedDate ?: string) {
      this.doctorName = doctorName;
      this.timeSlot = timeSlot;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bookingId = bookingId;
      this.date = date;
      this.updatedDate = updatedDate
    }
  }
