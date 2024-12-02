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
  userDetailsT: UsertT | undefined;


  // used as a flag to display or hide form
  editProfile = false;
  userDetails: any;
  updateMyDetails: any = {};
  editProfileForm!: FormGroup;
  // userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private testService: TestService,
  //  private dataService:DataService
  ) {

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
    this.userDetailsT = this.testService.getUser();



  }

  getProfileDetails() {
    // retrieve user details from service using userId
    this.testService.getUserDetails()
      // this.dataService.user()
      .subscribe({
        next: (response) => {
          console.log("getprofile",response)
          this.userDetails = response
          console.log(this.editProfile)
        }
      })

  }
  changeMyProfileT(){
    console.log("test")
  }
  changeMyProfile() {
console.log("changeMyProfile")
    // if successfully changed the profile it should display new details hiding the form
    this.testService.updateProfile(this.testService.userId,{
      "user_name":this.editProfileForm.get('userName')?.value,
      "user_mobile":this.editProfileForm.get('mobile')?.value,
      "user_email":this.editProfileForm.get('email')?.value,
      "location":this.editProfileForm.get('location')?.value,
      
    }).subscribe({
      next:(response)=>{
        console.log(response)
        if(response)
          this.getProfileDetails()
        this.discardEdit()
      },
      
      error(err) {
        console.log(err)
      },
    })

  }

  editMyProfile() {
    // change editProfile property value appropriately
    this.editProfile = true
console.log("editMyProfile",this.editProfile)

    this.editProfileForm.patchValue(this.userDetails)
    this.editProfileForm.patchValue({
      "userName": this.userDetails.user_name,
      "email": this.userDetails.user_email,
      "mobile": this.userDetails.user_mobile,
      "location": this.userDetails.location
    })

  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfileForm.reset()
    this.editProfile = false

  }

}
