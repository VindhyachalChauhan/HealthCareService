import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
API_URL:String;
  constructor( private http:HttpClient) {
    this.API_URL='http://localhost:5253/api';
   }

    registerPatient(patientDetails: Patient): Observable<void> {

    // should return response from server if patientDetails added successfully

    // handle error

    return this.http.post<void>(this.API_URL+"/Patients/",patientDetails).pipe(catchError(this.handleError));
  }
  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }
}
