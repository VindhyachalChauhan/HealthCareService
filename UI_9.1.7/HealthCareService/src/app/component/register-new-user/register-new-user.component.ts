

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
// import * as alertify from 'alertify.js';
import { Users } from '../../models/user';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

  regNewUser = new Users;
  signupForm: FormGroup;

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
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[0-9a-zA-z]*$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!$%@#*?&€£]).{8,}$')]),
      mobile: new FormControl('', [Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\." +
        "[a-zA-Z0-9_+&*-]+)*@" +
        "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
        "A-Z]{2,7}$")]),
      location: new FormControl('', [Validators.required])
    });
  }

  signUp() {
    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
    // reset the form
    this.dataService.regNewUser({ "user_name": this.signupForm.value.userName, "password": this.signupForm.value.password, "user_mobile": this.signupForm.value.mobile, "user_email": this.signupForm.value.email, "location": this.signupForm.value.location }).subscribe(
      response => {
        this.route.navigate(['/login'])
      },
      error => {
        console.log(error)
      }
    )
  }

  goBack() {
    // should navigate to login page
    this.route.navigate(['/login'])
  }

}
