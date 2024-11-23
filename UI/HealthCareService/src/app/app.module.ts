import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FormComponent } from './component/form/form.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    AllPatientsListComponent,
    ViewPatientComponent,
    AllRequestedAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
