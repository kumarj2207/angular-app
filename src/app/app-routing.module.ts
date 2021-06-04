import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './app-routing.guard';
import { AuthService } from './services/auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewregistrationComponent } from './newregistration/newregistration.component';
import { BatchComponent } from './batch/batch.component';
import { ChallengerDashboardComponent } from './challenger-dashboard/challenger-dashboard.component';
import { from } from 'rxjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Role } from './model/role.enum';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { ChallengerComponent } from './challenger/challenger.component';
import { MotivatorComponent } from './motivator/motivator.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'ems', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'ccv', component: CreditcardComponent, canActivate: [AuthGuard]},
  { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], 
                          canLoad: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
  { path: 'newregis', component: NewregistrationComponent, canActivate: [AuthGuard], 
                          canLoad: [AuthGuard], data: {roles: [Role.ADMIN], outlet: "ar"}
  },
  { path: 'batch', component: BatchComponent, canActivate: [AuthGuard], 
                                  canLoad: [AuthGuard], data: {roles: [Role.ADMIN, Role.MOTIVATOR]}
  },
  { path: 'registration', component: RegistrationComponent},
  { path: 'challengerdashboard', component: ChallengerDashboardComponent, canActivate: [AuthGuard]},
  { path: 'challenger/:id', component: ChallengerComponent, canActivate: [AuthGuard]},
  { path: 'motivator/:id', component: MotivatorComponent, canActivate: [AuthGuard]},
  { path: 'unauthorized', component: UnAuthorizedComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule { }
