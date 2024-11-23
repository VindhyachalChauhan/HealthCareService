import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Patient } from '../models/patient';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL:String;
  constructor( private http:HttpClient) {
    // this.API_URL='http://localhost:5253/api';
    this.API_URL=`${environment.apiBaseUrl}/api`;

   }

    registerPatient(patientDetails: Patient): Observable<void> {

    // should return response from server if patientDetails added successfully

    // handle error
      console.log("PatientService",patientDetails)
    return this.http.post<void>(this.API_URL+"/Patients/",patientDetails).pipe(catchError(this.handleError));
  }

  getAllPatients():Observable<Patient[]>{
    return this.http.get<Patient[]>(this.API_URL+"/Patients/").pipe(catchError(this.handleError));
  }

  getPatientById(id:string):Observable<Patient>{
    return this.http.get<Patient>(`${this.API_URL}/Patients/${id}`);
  }

  getDiseases():Observable<any>{
    return this.http.get<any[]>(this.API_URL+"/Appointments/diseases").pipe(catchError(this.handleError));
  }

  bookAppointment(appointmentDetails:any):Observable<any>{
    console.log(appointmentDetails)
    return this.http.post<any>(this.API_URL+"/Appointments",appointmentDetails).pipe(catchError(this.handleError));

  }

  scheduledAppointment():Observable<Appointment[]>{
    //console.log(appointmentDetails)
    return this.http.get<Appointment[]>(`${this.API_URL}/Appointments`).pipe(catchError(this.handleError));

  }

  getSinglePatientAppointments(id:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.API_URL}/Appointments/${id}`);
  }

  deleteAppointment(id:string):Observable<Appointment>{
    return this.http.delete<Appointment>(`${this.API_URL}/Appointments/${id}`);
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }

}
