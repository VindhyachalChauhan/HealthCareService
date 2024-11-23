import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit ,OnDestroy{

   patient!: Patient 
  listOfDiseases: any;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse: any;
  ScheduledAppointmentResponse: any;

  // id: string | null=null;
  paramsSubscription?:Subscription

  constructor(fb: FormBuilder,
     private route: Router, 
    private Aroute:ActivatedRoute,
    private dataService:DataService,
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
    let patientId:any
   this.paramsSubscription= this.Aroute.paramMap.subscribe({
      next:(params)=>{
       patientId= params.get('id');

    // get Particular Patient from service using patient id and assign response to patient property

       if(patientId)
       this.dataService.getPatientById(patientId)
      .subscribe({
        next:(response)=>{
          console.log(response)
          this.patient=response
        },
        error:(error) =>{
          console.log(error)
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

    this.dataService.getDiseases()
    .subscribe({
     next: (response)=>{
        this.listOfDiseases=response
        console.log(response)
      },
      error:(error) =>{
        console.log(error)
      }
  })
    
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment=false
    this.isFormEnabled=false
    this.isScheduledAppointment=true
    this.isTableEnabled=false
    console.log("bookAppointment")
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate

    // if booked successfully should redirect to 'requested_appointments' page
    const dataPipe:DatePipe=new DatePipe('en-IN')
    const date=dataPipe.transform(new Date(),'d/MM/y HH:mm:ss')
    this.dataService.bookAppointment({
      "patientId":this.patient?.userId,
      "disease":this.appointmentForm.get('selectDisease')?.value,
      "tentativedate":this.appointmentForm.get('tentativeDate')?.value,
      "priority":this.appointmentForm.get('priority')?.value   
    })
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.bookedAppointmentResponse=response
        this.route.navigate(['requested_appointments'])
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment=true
    this.isFormEnabled=false
    this.isScheduledAppointment=false
    // get particular patient appointments using getSinglePatientAppointments method of DataService 
    this.dataService.getSinglePatientAppointments(this.patient.userId)
    .subscribe({
      next:(response)=>{
        console.log(response)
        if(response.length==0)
          this.isTableEnabled=false
        else
          this.isTableEnabled=true
        this.ScheduledAppointmentResponse=response
      }, error:(error)=>{
        console.log(error)
      }
    })

  }

  cancelAppointment(appointmentId: any) {
    // delete selected appointment uing service
    this.dataService.deleteAppointment(appointmentId)
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.scheduledAppointment()
      },
      error:(error)=>{
        console.log(error)
      }
    })
    // After deleting the appointment, get particular patient appointments

  }
  
}
