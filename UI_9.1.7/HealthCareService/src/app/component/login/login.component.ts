

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLoggedIn: boolean = false;
	loginForm: FormGroup;
	isLoginFailed: boolean = false;

	emptyEmail = 'You must enter a Email';
	minlengthEmail = 'User name must be at least 3 characters long';
	maxlengthEmail = 'Email cannot exceed 20 characters';
	EmailPattern = 'Email should be in alphanumeric only';

	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

	constructor(private route: Router, private dataService: DataService) {
	}

	ngOnInit() {
		// add necessary validators

		this.loginForm = new FormGroup({
			// email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[0-9a-zA-z]*$')]),
			email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\." +
				"[a-zA-Z0-9_+&*-]+)*@" +
				"(?:[a-zA-Z0-9-]+\\.)+[a-z" +
				"A-Z]{2,7}$")]),
			password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!$%@#*?&€£]).{8,}$')])
		});
	}

	getemail() {
		return this.loginForm.get('email');
	}

	getPassword() {
		return this.loginForm.get('password');
	}


	doLogin() {
		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
		// reset the form
		// console.log(this.loginForm.value)
		localStorage.clear()

		

		this.dataService.authenticateUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
			response => {
				// console.log(response)
				// data = response
				if (response) {

					this.isLoggedIn = true;
					this.route.navigate(['/profile']);
				} else {
		
					this.isLoginFailed = true
					this.loginForm.reset()
				}

			},
			error => {
				console.log(error)
			}
		)
		

	}

	signUp() {
		// should navigate to register new user page
		this.route.navigate(['/register_user'])
	}

}









