import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, Subject, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';
import { Users } from '../models/user';
import { UsertT } from '../models/userT.model';

@Injectable({
  providedIn: 'root'

})
export class DataService {

  // $user=new BehaviorSubject<UsertT|undefined>(undefined);
  $user=new BehaviorSubject<Users|undefined>(undefined);




  // userId: string='f774208c-795f-47ad-f18d-08dd105c5082';
  userId!: string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }
// authenticateUserT(user_email: string, password: string){
//  return this.api.checkLogin(user_email,password)

// }
// setUser(user:UsertT):void{
//   this.$user.next(user)
//   this.userId=user.id
//   console.log("setUser.",this.$user)
//   localStorage.setItem('id',user.id)

//   // localStorage.setItem('user-email',user.user_email)
//   // localStorage.setItem('token',user.user_mobile)
//  }
// user():Observable<UsertT|undefined>{
//   //  console.log("user...")
//   return this.$user.asObservable();
// }


authenticateUserT(user_email: string, password: string){
  return this.api.checkLogin(user_email,password)
 
 }
 setUser(user:any):void{
   this.$user.next(user)
   this.userId=user.id
   console.log("setUser.",this.$user)
   localStorage.setItem('id',user.id)
 
   // localStorage.setItem('user-email',user.user_email)
   // localStorage.setItem('token',user.user_mobile)
  }
 user():Observable<Users|undefined>{
   //  console.log("user...")
   return this.$user.asObservable();
 }


 getUser():UsertT|undefined{
  const id=localStorage.getItem('id')
  if(id)
  {
    const user:UsertT={
      id:id
    };
    return user;
  }
  return undefined
 }



  authenticateUser(user_email: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    var subject =new Subject<boolean>();
    this.api.checkLogin(user_email,password)
    .subscribe({
      next:(respone)=>{
        console.log("dataService",respone)
        if(respone.id===null){
          subject.next(false)
          this.isLoggedIn=false
          this.isLogIn=new BehaviorSubject<boolean>(false);
        }
        else{
          console.log("vind",respone.id)
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
    // console.log(subject.asObservable())
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
  //  this.userId!= localStorage.getItem('id')
   console.log("dataService..",this.userId)

    return this.api.getUserDetails(this.userId).pipe(catchError(this.handleError));
  }

  updateProfile(userId:string, userDetails: any): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.updateDetails(userId,userDetails).pipe(catchError(this.handleError));
  }

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

