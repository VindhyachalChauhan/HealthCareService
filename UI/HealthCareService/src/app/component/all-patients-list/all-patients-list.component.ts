import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {
 //patients?:Patient[]
patients$?:Observable<Patient[]>;

  constructor(private dataService:DataService){

  }
  ngOnInit(): void {
// without async pipe
    // this.patientService.getAllPatients()
    // .subscribe({
    //   next:(response)=>{

    //     this.patients=response;
    //   }
    // });
   this.patients$= this.dataService.getAllPatientsList();

  }

}
