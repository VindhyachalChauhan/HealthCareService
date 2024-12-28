


import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails: any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl(''),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]+$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\." +
        "[a-zA-Z0-9_+&*-]+)*@" +
        "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
        "A-Z]{2,7}$")]),
      location: new FormControl('', [Validators.required])
    });

    // get profile details and display it

    this.getProfileDetails();

  }

  getProfileDetails() {
    // retrieve user details from service using userId
    this.dataService.getUserDetails().subscribe(
      response => {
        console.log(response)
        this.userDetails = response
      },
      error => {
        console.log(error)
      }
    )
    this.editProfileForm.patchValue({ "userName": '', "mobile": '', "email": '', "location": '' })
  }

  getMobile() {
    return this.editProfileForm.get('mobile');
  }

  getEmail() {
    return this.editProfileForm.get('email');
  }

  getLocation() {
    return this.editProfileForm.get('location');
  }

  changeMyProfile() {
    // if successfully changed the profile it should display new details hiding the form
    this.dataService.updateProfile(this.dataService.userId, { "user_name": this.editProfileForm.value.userName, "user_mobile": this.editProfileForm.value.mobile, "user_email": this.editProfileForm.value.email, "location": this.editProfileForm.value.location }).subscribe(
      response => {
        console.log(response)
        if (response) {
          this.getProfileDetails()
        }
        this.discardEdit()
      },
      error => {
        console.log(error)
      }
    )
  }

  editMyProfile() {
    // change editProfile property value appropriately
    this.editProfile = true
    this.editProfileForm.patchValue(this.userDetails)
    this.editProfileForm.patchValue({ "userName": this.userDetails.user_name, "email": this.userDetails.user_email, "mobile": this.userDetails.user_mobile, "location": this.userDetails.location })
  }

  discardEdit() {
    // change editProfile property value appropriately
    this.editProfileForm.reset()
    this.editProfile = false
  }

}



