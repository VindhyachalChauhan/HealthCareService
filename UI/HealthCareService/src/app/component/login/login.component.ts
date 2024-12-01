// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }



import { Component, OnInit,  Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { TestService } from 'src/app/services/test.service';
// import * as alertify from 'alertify.js';
// import{} from 'ngx-'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers:[DataService]
})
export class LoginComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	loginForm!: FormGroup;
	isLoginFailed: boolean = false;
	// private loginSubscription?:Subscription


	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

    emailErrMsg = 'You must enter a valid Email ID';

	constructor(private route: Router,
		//  private dataService: DataService,
		// private apiService:ApiService,
		private cookieService:CookieService,
		private testService:TestService
	) {
	 }

// 	ngOnDestroy(): void {
// this.loginSubscription?.unsubscribe();
// 	}

	ngOnInit() {
		// add necessary validators

		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl('')
		});
	}
	doLoginT(){
		this.testService.authenticateUserT(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).
		subscribe({
			next:(response)=>{
				console.log("T..",response.id)
				// set auth cookie
				 this.cookieService.set('Authorization',`Bearer ${response.token}`
          ,undefined,'/',undefined,true,'Strict');


		  //set user
		  this.testService.setUser({
			id:response.id			
		  });

		  this.route.navigateByUrl('/profile')


			}
		});
	}

	doLogin() {
		// //implementting cookies login
		// this.apiService.checkLogin(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).
		// subscribe({
		// 	next:(response)=>{
		// 		// console.log(response)
		// 		//set auth cookie
		// 		 this.cookieService.set('Authorization',`Bearer ${response.token}`
        //   ,undefined,'/',undefined,true,'Strict')


		//   this.route.navigateByUrl()

		// 	}
		// })

		
		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
		   // reset the form
		//    console.log("doLogin",this.loginForm.value)
		   localStorage.clear()
		   var data!:Boolean
		//    console.log("login")
		//  this.dataService.authenticateUser(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).
		//    subscribe({
		// 	next:(response)=>{
		// 		console.log("test")
		// 	}
		//    })
		//    .subscribe({
		// 	next:(response)=>{
		// 		console.log("hi",response)
		// 		// data=response
		// 		// console.log(data)
		// 	},
		// 	error:(error)=>{
		// 		console.log(error);
		// 		}
		//    });
		   if(data)
		   {
			// console.log(data)
			this.isLoggedIn=true
			this.route.navigate(['/profile'])
		   }
		   else{
			// console.log(data)

			this.isLoginFailed=true
			this.loginForm.reset()
		   }

	}

	signUp() {
		// should navigate to register new user page
		this.route.navigate(['/register_user'])

	}

}



