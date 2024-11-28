// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-all-requested-appointments',
//   templateUrl: './all-requested-appointments.component.html',
//   styleUrls: ['./all-requested-appointments.component.css']
// })
// export class AllRequestedAppointmentsComponent {

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { DataService } from 'src/app/services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-all-requested-appointments',
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css']
})
export class AllRequestedAppointmentsComponent implements OnInit {

	allAppointments:any;

  constructor(
    private dataService: DataService,
     private route: Router) { 
  }

  ngOnInit() {
    // call appointments method by default
    this.appointments();
  }

  appointments() {

    // get all requested appointments from service
    this.dataService.requestedAppointments().
    subscribe({
      next:(response)=>{
        this.allAppointments=response
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  view(patientId: any) {

    // should navigate to 'patientList' page with selected patientId
    this.route.navigate(['patientList/'+patientId])

  }

  cancelAppointment(id: any) {

    // delete selected appointment uing service
    this.dataService.deleteAppointment(id)
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.appointments()
      },
      error:(error)=>{
        console.log(error)
      }
    })
    // After deleting the appointment, get all requested appointments


  }

}
