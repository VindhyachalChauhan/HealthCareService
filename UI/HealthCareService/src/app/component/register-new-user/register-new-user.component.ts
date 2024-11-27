// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register-new-user',
//   templateUrl: './register-new-user.component.html',
//   styleUrls: ['./register-new-user.component.css']
// })
// export class RegisterNewUserComponent {

// }


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/user';
import { NotExpr } from '@angular/compiler';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

	regNewUser = new Users;
	signupForm!: FormGroup;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private route: Router, private dataService: DataService) {
   }

  ngOnInit() {

    // add necessary validators

  	this.signupForm = new FormGroup({
  		userName: new FormControl(''),
  		password: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
  	});
  }

  signUp() {

    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
       // reset the 
// console.log(this.signupForm.value)
      this.dataService.regNewUser({
        "user_name":this.signupForm.value.userName,
        "password":this.signupForm.value.password,
        "user_mobile":this.signupForm.value.mobile,
        "user_email":this.signupForm.value.email,
        "location":this.signupForm.value.location
      })
      .subscribe({
        next:(response)=>{
          this.route.navigate(['/login'])
        },
        error:(error)=>{
          console.log(error)
        }
      })
      
      
    
  }

  goBack() {

    // should navigate to login page
    this.route.navigate(['/login'])


  }


}
