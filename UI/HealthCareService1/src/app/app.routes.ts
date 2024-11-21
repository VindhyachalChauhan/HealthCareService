import { Component } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import path from 'path';
import { NgModule } from '@angular/core';

import { PatientListComponent } from './features/patient/patient-list/patient-list.component';
import { AddPatientComponent } from './features/patient/add-patient/add-patient.component';
import { FormComponent } from './features/patient/form/form.component';

export const routes: Routes = [
    {
    path:'patientList',
    component:PatientListComponent
    },
    {path:'addPatient',component:AddPatientComponent},
    {path:'form',component:FormComponent}

];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] }) export class AppRoutingModule { }
