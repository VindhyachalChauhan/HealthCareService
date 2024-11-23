// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-view-patient',
//   templateUrl: './view-patient.component.html',
//   styleUrls: ['./view-patient.component.css']
// })
// export class ViewPatientComponent {

// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit ,OnDestroy{

   patient?: Patient
  //Patient={
  //   userId:'',
  //   patient_dob:'',
  //   patient_email:'',
  //   patient_gender:'',
  //   patient_mobile:0,
  //   patient_name:'',
  //   regTime:new Date
  // };
  
  

  listOfDiseases: any;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  //appointmentDetails = new Appointment;
  bookedAppointmentResponse: any;
  ScheduledAppointmentResponse: any;

  id: string | null=null;
  paramsSubscription?:Subscription

  constructor(fb: FormBuilder,
    // private route: Router, 
    private route:ActivatedRoute,
    private patientService:PatientService,
    private datePipe: DatePipe, private activatedRoute: ActivatedRoute,
    //  private dataService: DataService
    ) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    // add necessary validators

    this.appointmentForm = fb.group({
      'selectDisease' : [null],
      'tentativeDate' : [null],
      'priority' : [null]
    })
   }


  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property
   this.paramsSubscription= this.route.paramMap.subscribe({
      next:(params)=>{
       this.id= params.get('id');

       if(this.id)
       this.patientService.getPatientById(this.id)
      .subscribe({
        next:(response)=>{
          this.patient=response
        }
      });
      }
    })
  }
  ngOnDestroy(): void {

    this.paramsSubscription?.unsubscribe();
  }

  bookAppointment() {
    // get diseases list from service

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    console.log("bookAppointment")
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate

    // if booked successfully should redirect to 'requested_appointments' page
    
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getSinglePatientAppointments method of DataService 
    console.log("scheludedAppointment")


  }

  cancelAppointment(appointmentId: any) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments

  }
  
}
