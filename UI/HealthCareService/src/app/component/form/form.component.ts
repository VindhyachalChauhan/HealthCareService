// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']
// })
// export class FormComponent {

// }
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';

// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit,OnDestroy {

  complexForm: FormGroup;
  patientDetails = new Patient;
  private patientSubscription?:Subscription
  result: any;

  today:any;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyName = 'You must include a name.';
  minlengthName = 'Your name must be at least 3 characters long.';
  maxlengthName = 'Your name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, 
    private patientService: PatientService
  ){
    // add necessary validators
    this.complexForm = fb.group({
      'name' : [''],
      'gender' : [null],
      'dob' : [null],
      'mobile' : [''],
      'email' : ['']
    });
 //   this.patientDetails = new Patient('', '', '', new Date(), '', '', '', new Date()); // Initialize the patient model
  }


  submitForm(value: any){

    // should reister new patient using service
       // fields that need to be added: patient_name, patient_gender, patient_dob, patient_mobile, patient_email
    // if added successfully should redirect to 'patientList' page
   // this.patientDetails=this.complexForm.value as Patient
    this.patientDetails={
      patient_name:this.complexForm.get('name')?.value,
      patient_gender:this.complexForm.get('gender')?.value,
      patient_dob:this.complexForm.get('dob')?.value,
      patient_email:this.complexForm.get('email')?.value,
      patient_mobile:this.complexForm.get('mobile')?.value,
    //  id:'a'
      
      // patient_dob:this.complexForm.get('dob'),
    }
   // console.log(this.patientDetails)
   this.patientSubscription= this.patientService.registerPatient(this.patientDetails)
    .subscribe({
      next:(response)=>{
        console.log(this.patientDetails)

      }
    })

  }
  ngOnDestroy(): void {
    this.patientSubscription?.unsubscribe();
  }

}
