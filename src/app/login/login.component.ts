import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnedUser } from '../model/returnedUser';
import { Role } from '../model/role.enum';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  errorMessage: string;
  error: boolean;
  
  constructor(private router: Router, private authService: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this.error = false;
    let role: Role = null;
    this.loginService.login(this.userName, this.password).subscribe(
      data => this.callAuth(data),
      error => {this.error=true; this.errorMessage=error.error.message}
    );
  }  

  callAuth(returnedUser: ReturnedUser): void {
    //console.log(returnedUser.role.toString());
    //console.log(returnedUser.role.valueOf());
    if(returnedUser == null) {
      throw new Error('Method not implemented.');
    }
    
    this.authService.login(returnedUser.referralId, returnedUser.userName, returnedUser.role, returnedUser.token);
    if(returnedUser.role.toString() === 'ADMIN'){
      this.router.navigate(['/admindashboard']);
    }
    if(returnedUser.role.toString() === 'CHALLENGER'){
      this.router.navigate(['/challengerdashboard']);
    }
  }

  logout() {
    this.authService.logout();
  }  

}
