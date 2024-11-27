// import { Injectable } from '@angular/core';
// import {HttpClient, HttpErrorResponse} from '@angular/common/http'
// import { Patient } from '../models/patient';
// import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Appointment } from '../models/appointment';
// import { LoginResponse } from '../models/loginResponse';
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   API_URL:String;
//   userId!: string;
//   isLoggedIn: false = false;
//   isLogIn!: BehaviorSubject<boolean>;

//   constructor( private http:HttpClient) {
//     // this.API_URL='http://localhost:5253/api';
//     this.API_URL=`${environment.apiBaseUrl}/api`;
//     this.isLogIn=new BehaviorSubject<boolean>(false)

//    }

//    authenticateUser(user_name:string,password:string):Observable<any>{
//     console.log()
//     return this.http.post<any>(this.API_URL+"/Auth/Login",{
//       email:user_name,
//       password:password
//     }).pipe(catchError(this.handleError));
//    }

//    regNewUser(regNewUser: any):Observable<any>{
//     console.log(regNewUser)
//     return this.http.post<any>(this.API_URL+"/Auth/Register",regNewUser).pipe(catchError(this.handleError));
//    }

//    getUserDetails(userId: any):Observable<any>{
//     console.log(userId)
//     return this.http.get<any>(this.API_URL+"/Users/"+userId).pipe(catchError(this.handleError));
//    }

//     registerPatient(patientDetails: Patient): Observable<void> {

//     // should return response from server if patientDetails added successfully

//     // handle error
//       console.log("PatientService",patientDetails)
//     return this.http.post<void>(this.API_URL+"/Patients/",patientDetails).pipe(catchError(this.handleError));
//   }

//   getAllPatients():Observable<Patient[]>{
//     return this.http.get<Patient[]>(this.API_URL+"/Patients/").pipe(catchError(this.handleError));
//   }

//   getPatientById(id:string):Observable<Patient>{
//     return this.http.get<Patient>(`${this.API_URL}/Patients/${id}`);
//   }

//   getDiseases():Observable<any>{
//     return this.http.get<any[]>(this.API_URL+"/Appointments/diseases").pipe(catchError(this.handleError));
//   }

//   bookAppointment(appointmentDetails:any):Observable<any>{
//     console.log(appointmentDetails)
//     return this.http.post<any>(this.API_URL+"/Appointments",appointmentDetails).pipe(catchError(this.handleError));

//   }

//   scheduledAppointment():Observable<Appointment[]>{
//     //console.log(appointmentDetails)
//     return this.http.get<Appointment[]>(`${this.API_URL}/Appointments`).pipe(catchError(this.handleError));

//   }

//   getSinglePatientAppointments(id:string):Observable<Appointment[]>{
//     return this.http.get<Appointment[]>(`${this.API_URL}/Appointments/${id}`);
//   }

//   deleteAppointment(id:string):Observable<Appointment>{
//     return this.http.delete<Appointment>(`${this.API_URL}/Appointments/${id}`);
//   }


  
//   private handleError(error:HttpErrorResponse){
//     return throwError(error)
//   }

// }




import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId!: string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_email: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 

    return;
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status

    return
  }

  regNewUser(regNewUser: { user_name: any; password: any; user_mobile: any; user_email: any; location: any; }): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists

  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service

    return;
  }

  updateProfile(userId:string, userDetails: any): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  registerPatient(patientDetails: Patient): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error 

    return;
  }

  getParticularPatient(id: any): Observable<any> {
    // should return particular patient details from server

    // handle error 

    return;
  }
  
  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error 

    return;
  }

  scheduleAppointment(appointmentDetails: any): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error 

    return;
  }

  getSinglePatientAppointments(patientId: string): Observable<any> {
    // should return appointments of particular patient from server

    // handle error 

    return;
  }

  deleteAppointment(appointmentId: any): Observable<any> {
    // should delete the appointment

    // handle error

    return
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error 

    return;
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
  }


}

