import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Patient } from '../models/patient';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

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

  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }

}
