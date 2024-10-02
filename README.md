# Doctor Appointment Booking System

This is a simple Doctor Appointment Booking System built with NestJS. Users can book, view, cancel, and modify doctor appointments. The system includes a fixed list of doctors and available time slots for each doctor.



## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/ABHISHEKnayak0110/Doctor-Appointment-Booking-System.git
```

### 2. Start the Backend Server
Step 1: Install the necessary Node.js modules:
npm install

Step 2: Start the server:
npm run start:dev 

The backend server will start on port 3001 ```http://localhost:3001/.```.

### How to Use the Application

###### Fixed List of Doctors and Time Slots
This system comes with a fixed list of doctors and predefined available time slots. Here's an example of the doctor data:
```shell
[
  {
    "name": "Abhishek",
    "availableSlots": [
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 01:00 PM",
      "01:00 PM - 02:00 PM"
    ],
    "bookedSlots": []
  },
  {
    "name": "John",
    "availableSlots": [
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 01:00 PM",
      "01:00 PM - 02:00 PM"
    ],
    "bookedSlots": []
  },
  {
    "name": "Naina",
    "availableSlots": [
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 01:00 PM",
      "01:00 PM - 02:00 PM"
    ],
    "bookedSlots": []
  },
  {
    "name": "Batra",
    "availableSlots": [
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 01:00 PM",
      "01:00 PM - 02:00 PM"
    ],
    "bookedSlots": []
  }
]

```


  
  **1.  Booking an Appointment :**
  - To book an appointment, provide a valid doctor's name and a time slot from the list.
  - The system will create a booking if the provided slot is available.

```bash
curl --location 'http://localhost:3001/appointment/book' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName" : "sam", 
    "lastName" : "Kl",
    "email" : "aaa@gmail.com",
    "doctorName" : "Abhishek",
    "timeSlot" : "10:00 AM - 11:00 AM"
} '
```
  
  **2. Updating an Appointment :**
  - You can update a booking by providing the new time slot.
  - The system will update the booking only if the new slot is available..
  - If the requested slot is unavailable, the system will suggest other available slots.

```bash
curl --location --request PATCH 'http://localhost:3001/appointment/update' \
--header 'Content-Type: application/json' \
--data-raw '{

    "email" : "aaa@gmail.com",
    "originalTimeSlot" : "10:00 AM - 11:00 AM",
    "newTimeSlot" : "12:00 AM - 01:00 PM"
} '
```
  

  **3. Canceling an Appointment :**
    - You can cancel an existing appointment, and the system will free up the booked slot.

```bash
curl --location --request DELETE 'http://localhost:3001/appointment/cancel' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "aaa@gmail.com",
    "timeSlot" : "12:00 AM - 01:00 PM"
} '
```

  **4. Getting Patient Appointment Details :**
    - The system allows you to retrieve the appointment details for a specific patient. 
    - You will get information such as the patient's booked slot, the assigned doctor, and the appointment time.

```bash
curl --location 'http://localhost:3001/appointment/patient?email=aaa%40gmail.com'
```

  **5. Getting Doctor Appointment Details :**
  - You can also retrieve the appointment details for a specific doctor.
  - The system will provide details of all the booked slots for that doctor, including the patients assigned to each slot.
  

```bash
curl --location 'http://localhost:3001/appointment/doctor?doctorName=Abhishek'
```

## Note
Please be aware that all data in this application is stored **in-memory**, meaning it will reset when the application is restarted. You can modify the doctors' names, available slots, and other data in the code as per your requirements. Simply update the predefined data in the respective files before running the application to reflect the changes in the system.

Since the data is not persistent, any bookings or modifications you make will be lost upon application restart.



That's it! You can now use the Doctor Appointment Booking System to create your Appointment. 

### Contact
For any questions or issues, feel free to contact  : abhisheknayak0110@gmail.com

