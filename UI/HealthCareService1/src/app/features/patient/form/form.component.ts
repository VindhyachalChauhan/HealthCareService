import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../models/patient';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

   complexForm: FormGroup;
  patientDetails = new Patient;
  result: any;
    today: any ;
  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  noEmail = 'You must include a valid email.';
  patternEmail = 'Pattern does not match.';



  constructor( fb: FormBuilder,private route: Router,
     //private dataService: DataService
     private apiService:ApiService
    ){
    this.complexForm = fb.group({
      'firstName' : ['Vindhya'],
      'lastName': [''],
      'gender' : [null],
      'dob' : [null],
      'mobile' : [''],
      'email' : [''],
      'description' : ''
    })
  }

  onSubmit(): void {
    if (this.complexForm.valid) {
      this.patientDetails=this.complexForm.value;
      console.log('Form Submitted!', this.complexForm.value);
      this.apiService.registerPatient(this.patientDetails)
      .subscribe({
        next:(response)=>{
          console.log("data added")
        }
      })
      // // console.log(this.patientDetails);
    }
  }
}

