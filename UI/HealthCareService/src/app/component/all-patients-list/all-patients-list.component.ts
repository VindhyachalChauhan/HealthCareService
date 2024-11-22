import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {
 patients?:Patient[]
  constructor(private patientService:PatientService){

  }
  ngOnInit(): void {

    this.patientService.getAllPatients()
    .subscribe({
      next:(response)=>{

        this.patients=response;
      }
    });

  }

}
