import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';
import { FormComponent } from './component/form/form.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterNewUserComponent } from './component/register-new-user/register-new-user.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { HeaderInterceptor } from './interceptors/header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AllPatientsListComponent,
    AllRequestedAppointmentsComponent,
    FormComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    RegisterNewUserComponent,
    ViewPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
