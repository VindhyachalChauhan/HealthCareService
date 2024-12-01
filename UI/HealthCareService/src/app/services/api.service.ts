// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'

})
export class ApiService {

  API_URL: String;

  constructor(private http: HttpClient) {
    // this.API_URL = 'api';
    this.API_URL=`${environment.apiBaseUrl}/api`;


  }

  public checkLogin(user_email: string, password: string): Observable<any> {
    // should return response from server
    // console.log
    return this.http.post<any>(this.API_URL+"/Users/signin",{
            email:user_email,
            password:password
          }).pipe(catchError(this.handleError));
    // handle error 

  }

  public regNewUser(regNewUser: any): Observable<any> {
    // should return response from server
    return this.http.post<any>(this.API_URL+"/Users",regNewUser).pipe(catchError(this.handleError));

    // handle error 

  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server
    // return this.http.get<any>(this.API_URL+"/Users/"+userId).pipe(catchError(this.handleError));
    return this.http.get<any>(this.API_URL+"/Users/"+userId).pipe(catchError(this.handleError));

    // handle error 

  }

  // public updateDetails(userId:string, userDetails: any): Observable<any> {
  //   // should return response from server

  //   // handle error 

  //   return;;
  // }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully
    return this.http.post<void>(this.API_URL+"/Patients/",patient).pipe(catchError(this.handleError));

    // handle error 

  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server
    return this.http.get<Patient[]>(this.API_URL+"/Patients/").pipe(catchError(this.handleError));

    // handle error 

  }

  public getParticularPatient(patientId: any): Observable<any> {
    // should return particular patient details from server
    return this.http.get<Patient>(`${this.API_URL}/Patients/${patientId}`);

    // handle error 

  }

  public diseasesList(): Observable<any> {

    // should return diseases from server
    return this.http.get<any[]>(this.API_URL+"/Appointments/diseases").pipe(catchError(this.handleError));

    // handle error 

  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully
    return this.http.post<any>(this.API_URL+"/Appointments",appointmentDetails).pipe(catchError(this.handleError));

    // handle error 

  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server
    return this.http.get<Appointment[]>(`${this.API_URL}/Appointments`).pipe(catchError(this.handleError));

    // handle error 

  }

  public getSinglePatientAppointments(patientId: any): Observable<any> {

    // should return appointments of particular patient from server
    return this.http.get<Appointment[]>(`${this.API_URL}/Appointments/${patientId}`);

    // handle error 

  }

  public deleteAppointment(appointmentId: any): Observable<any> {

    // should delete the appointment
    return this.http.delete<Appointment>(`${this.API_URL}/Appointments/${appointmentId}`);

    // handle error

  }


  private handleError(error: HttpErrorResponse) {

    // handle error here
    return throwError(error)

  }

}
