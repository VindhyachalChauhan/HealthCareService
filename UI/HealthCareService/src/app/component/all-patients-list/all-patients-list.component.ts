import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {
 //patients?:Patient[]
patients$?:Observable<Patient[]>;

  constructor(private patientService:PatientService){

  }
  ngOnInit(): void {
// without async pipe
    // this.patientService.getAllPatients()
    // .subscribe({
    //   next:(response)=>{

    //     this.patients=response;
    //   }
    // });
   this.patients$= this.patientService.getAllPatients();

  }

}
