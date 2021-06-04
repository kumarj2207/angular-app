import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';


import { HttpService } from "./http.service";


//import { environment } from 'src/environments/environment';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { EmployeeInMemDataService } from './services/employee-in-mem-data.service';
import { HttpClientEmployeeService } from './services/http-client-employee.service';
import { IdproviderService } from './services/idprovider.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewregistrationComponent } from './newregistration/newregistration.component';
import { BatchComponent } from './batch/batch.component';
import { ChallengerDashboardComponent } from './challenger-dashboard/challenger-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ViewMeasurementComponent } from './view-measurement/view-measurement.component';
import { ChallengerComponent } from './challenger/challenger.component';
import { MotivatorComponent } from './motivator/motivator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    WelcomeComponent,
    CreditcardComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegistrationComponent,
    NewregistrationComponent,
    BatchComponent,
    ChallengerDashboardComponent,
    PageNotFoundComponent,
    UnAuthorizedComponent,
    MeasurementComponent,
    ViewMeasurementComponent,
    ChallengerComponent,
    MotivatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule
    //environment.production ? [] : InMemoryWebApiModule.forRoot(EmployeeInMemDataService)
  ],
  providers: [HttpService, HttpClientEmployeeService, IdproviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
