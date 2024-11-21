// import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
// import { catchError, Observable, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   constructor( ) { }

//   registerPatient(patientDetails: any): Observable<any> {


//     // should return response retrieved from ApiService

//     // handle error 

//     return this.api.registerPatient(patientDetails).pipe(catchError(this.handleError));

  
//   }
//   private handleError(error:HttpErrorResponse){
//     return throwError(error)
//   }
// }
