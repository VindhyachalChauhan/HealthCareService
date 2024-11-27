// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }



import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	loginForm!: FormGroup;
	isLoginFailed: boolean = false;

	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

    emailErrMsg = 'You must enter a valid Email ID';

	constructor(private route: Router, private dataService: DataService) {
	 }

	ngOnInit() {
		// add necessary validators

		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl('')
		});
	}

	doLogin() {

		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
		   // reset the form
		   console.log("doLogin",this.loginForm.value)
	}

	signUp() {
		// should navigate to register new user page
		this.route.navigate(['/register_user'])

	}

}



