// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent {

// }



import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { TestService } from 'src/app/services/test.service';
import { UsertT } from 'src/app/models/userT.model';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userDetailsT:UsertT | undefined;


  // used as a flag to display or hide form
  editProfile = false;
  userDetails: any;
  updateMyDetails : any = {};
  editProfileForm!: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private testService: TestService) { 

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
    });
    
    // get profile details and display it
    this.getProfileDetails()
   this.userDetailsT= this.testService.getUser();


    
  }

  getProfileDetails() {
    // retrieve user details from service using userId
    this.testService.getUserDetails()
    // this.dataService.user()
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.userDetails=response
      }
    })

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form

  }

  editMyProfile() {

    // change editProfile property value appropriately

  }

  discardEdit() {

    // change editProfile property value appropriately

  }

}
