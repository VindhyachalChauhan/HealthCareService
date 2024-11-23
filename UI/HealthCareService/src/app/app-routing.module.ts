import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';

const routes: Routes = [
	{path:'form', component:FormComponent},
	{path:'patientList', component:AllPatientsListComponent},
  {path:'patientList/:id',component:ViewPatientComponent},
  {path:'requested_appointments',component:AllRequestedAppointmentsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
