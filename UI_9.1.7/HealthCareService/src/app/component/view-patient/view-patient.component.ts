




import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder, private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // add necessary validators

    this.appointmentForm = fb.group({
      'selectDisease': [null, [Validators.required]],
      'tentativeDate': [null, [Validators.required]],
      'priority': [null, [Validators.required]]
    })
  }

  ngOnInit() {
    let patientId: any
    // get selected patient id
    this.activatedRoute.paramMap.subscribe(params => {
      patientId = params.get('id')
    });
    // get Particular Patient from service using patient id and assign response to patient property
    this.dataService.getParticularPatient(patientId).subscribe(
      response => {
        console.log(response)
        this.patient = response
      },
      error => {
        console.log(error)
      }
    )
  }

  bookAppointment() {
    // get diseases list from service
    this.dataService.diseasesList().subscribe(
      response => {
        this.listOfDiseases = response
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment = false
    this.isFormEnabled = false
    this.isScheduledAppointment = true
    this.isTableEnabled = false
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate

    // if booked successfully should redirect to 'requested_appointments' page

    const datepipe: DatePipe = new DatePipe('en-IN')
    const date = datepipe.transform(new Date(), 'd/MM/y HH:mm:ss')
    this.dataService.scheduleAppointment({ "patientId": this.patient.id, "disease": this.appointmentForm.get('selectDisease').value, "priority": this.appointmentForm.get('priority').value, "tentativedate": this.appointmentForm.get('tentativeDate').value })
      .subscribe(
        response => {
          console.log(response)
          this.bookedAppointmentResponse = response
          this.route.navigate(['requested_appointments'])
        },
        error => {
          console.log(error)
        }
      )

  }

  scheduledAppointment() {
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment = true
    this.isFormEnabled = false
    this.isScheduledAppointment = false
    // get particular patient appointments using getSinglePatientAppointments method of DataService
    this.dataService.getSinglePatientAppointments(this.patient.patient_Id).subscribe(
      response => {
        console.log(response)
        if (response.length == 0) {
          this.isTableEnabled = false
        } else {
          this.isTableEnabled = true
        }
        this.ScheduledAppointmentResponse = response
      },
      error => {
        console.log(error)
      }
    )
  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service
    this.dataService.deleteAppointment(appointmentId).subscribe(
      response => {
        console.log(response)
        this.scheduledAppointment()
      },
      error => {
        console.log(error)
      }
    )
    // After deleting the appointment, get particular patient appointments
  }

}



