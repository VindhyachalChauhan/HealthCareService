import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';
import { RegisterNewUserComponent } from './component/register-new-user/register-new-user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
	{path:'', redirectTo:'login', pathMatch:'full'},
	{path:'login', component:LoginComponent},
	{path:'form', component:FormComponent,canActivate:[authGuard]},
	{path:'patientList', component:AllPatientsListComponent,canActivate:[authGuard]},
  {path:'patientList/:id',component:ViewPatientComponent,canActivate:[authGuard]},
  {path:'requested_appointments',component:AllRequestedAppointmentsComponent,canActivate:[authGuard]},
	{path: 'register_user',component:RegisterNewUserComponent},
  {path:'profile',component:ProfileComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
