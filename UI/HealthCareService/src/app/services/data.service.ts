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
import { BehaviorSubject,Observable, of, Subject, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})
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

    var subject =new Subject<boolean>();
    this.api.checkLogin(user_email,password)
    .subscribe({
      next:(respone)=>{
        // console.log(respone.id)
        if(respone.id===null){
          subject.next(false)
          this.isLoggedIn=false
          this.isLogIn=new BehaviorSubject<boolean>(false);
        }
        else{
          // console.log(respone.id)
          this.userId=respone.id
          localStorage.setItem('id',respone.id)
          localStorage.setItem('token',respone.token)
          this.isLoggedIn=true
          this.isLogIn=new BehaviorSubject<boolean>(true);
        }
      },
      error:(error)=>{
        console.log(error)
      }
    })
    // return true if user authenticated
    // return false if user not authenticated 
    console.log(subject.asObservable())
    return subject.asObservable();

  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
    if(this.isLoggedIn)
      return of(true)
    return of(false)
  }

  regNewUser(regNewUser: { user_name: any; password: any; user_mobile: any; user_email: any; location: any; }): Observable<any> {
    // should return response retrieved from ApiService
    return this.api.regNewUser(regNewUser).pipe(catchError(this.handleError))
    // handle error 

  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
    this.isLoggedIn=false
    this.isLogIn=new BehaviorSubject(false)
    localStorage.removeItem('id')
    localStorage.removeItem('token')

  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service

    return this.api.getUserDetails(this.userId).pipe();
  }

  // updateProfile(userId:string, userDetails: any): Observable<boolean> {

  //   // should return response retrieved from ApiService

  //   // handle error 

  //   return;
  // }

  registerPatient(patientDetails: Patient): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails).pipe(catchError(this.handleError));
  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error 

    return this.api.getAllPatientsList().pipe(catchError(this.handleError));
  }

  getParticularPatient(id: any): Observable<any> {
    // should return particular patient details from server

    // handle error 

    return this.api.getParticularPatient(id).pipe(catchError(this.handleError));
  }
  
  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error 

    return this.api.diseasesList().pipe(catchError(this.handleError));
  }

  scheduleAppointment(appointmentDetails: any): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error 

    return this.api.scheduleAppointment(appointmentDetails).pipe(catchError(this.handleError));
  }

  getSinglePatientAppointments(patientId: string): Observable<any> {
    // should return appointments of particular patient from server

    // handle error 

    return this.api.getSinglePatientAppointments(patientId).pipe(catchError(this.handleError));
  }

  deleteAppointment(appointmentId: any): Observable<any> {
    // should delete the appointment

    // handle error

    return this.api.deleteAppointment(appointmentId).pipe(catchError(this.handleError));
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error 

    return this.api.requestedAppointments().pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error)

  }


}

