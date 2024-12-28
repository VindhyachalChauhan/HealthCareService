


import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';


import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId: string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage
    var subject = new Subject<boolean>();
    this.api.checkLogin(user_name, password).subscribe(
      response => {
        if (response.id === null) {
          subject.next(false)
          this.isLoggedIn = false
          // console.log(this.isLoggedIn)
          this.isLogIn = new BehaviorSubject<boolean>(false);
        } else {
          subject.next(true)
          this.userId = response.id
          localStorage.setItem('id', response.id)
          localStorage.setItem('token', response.token)
          this.isLoggedIn = true
          // console.log(this.isLoggedIn)
          this.isLogIn = new BehaviorSubject<boolean>(true);
        }
      },
      error => {
        throwError(error)
      }
    )
    // return true if user authenticated
    // return false if user not authenticated
    return subject.asObservable();
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
    if (this.isLoggedIn) {
      return of(true)
    }
    return of(false)
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService
    return this.api.regNewUser(regNewUser).pipe(catchError(this.handleError))
    // handle error
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
    this.isLoggedIn = false
    this.isLogIn = new BehaviorSubject(false);
    localStorage.removeItem('id')
    localStorage.removeItem('token')
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service
    return this.api.getUserDetails(this.userId).pipe(catchError(this.handleError))
  }

  updateProfile(userId: string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService
    return this.api.updateDetails(userId, userDetails).pipe(catchError(this.handleError))
    // handle error
  }

  registerPatient(patientDetails): Observable<any> {
    // should return response retrieved from ApiService
    return this.api.registerPatient(patientDetails).pipe(catchError(this.handleError))
    // handle error
  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server
    return this.api.getAllPatientsList().pipe(catchError(this.handleError))
    // handle error
  }

  getParticularPatient(id): Observable<any> {
    // should return particular patient details from server
    return this.api.getParticularPatient(id).pipe(catchError(this.handleError))
    // handle error
  }

  diseasesList(): Observable<any> {
    // should return diseases from server
    return this.api.diseasesList().pipe(catchError(this.handleError))
    // handle error
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully
    return this.api.scheduleAppointment(appointmentDetails).pipe(catchError(this.handleError))
    // handle error

    return;
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server
    return this.api.getSinglePatientAppointments(patientId).pipe(catchError(this.handleError))
    // handle error
  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment
    return this.api.deleteAppointment(appointmentId).pipe(catchError(this.handleError))
    // handle error
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server
    return this.api.requestedAppointments().pipe(catchError(this.handleError))
    // handle error
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error)
  }

 getUserId(): number {

    // retrieve 'userId' from localstorage
    return parseInt(localStorage.getItem('userId'));

  }


}

