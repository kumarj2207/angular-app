import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientDietService } from '../services/http-client-diet.service';
import { InteractionService } from '../services/interaction.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-challenger-dashboard',
  templateUrl: './challenger-dashboard.component.html',
  styleUrls: ['./challenger-dashboard.component.css']
})
export class ChallengerDashboardComponent implements OnInit {

  showMeasurement: boolean = false;
  userName: string;
  showMessage: boolean = true;

  constructor(private authService: AuthService,
    private loginService: LoginService,
    private dietService: HttpClientDietService,
    private formBuilder: FormBuilder) { }

  user: any = {};
  ngOnInit(): void {
    this.userName = this.authService.getAuthenticatedUser();
    let req = this.dietService.getDietUserById();
    req.subscribe(
      success => {this.user = success},
      error => {alert(error.error.message)}
    );
  }

  measurements: any;
  parentFunction(data: any): void {
    this.measurements = data;
  }

  hide: boolean = true;
  showChangePasswordDiv: boolean = false;
  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', Validators.required]
  }, {
    validator: MustMatch('newPassword', 'confirmNewPassword')
  });
  
  showChangePassword() {
    this.changePasswordForm.reset();
    this.showChangePasswordDiv = true; 
  }

  submitted: boolean = false;
  changePassword() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      alert("Some problem in form.");
      return;
    }

    let req = this.loginService.changePassword(this.changePasswordForm.value);
    req.subscribe(
      success => {alert(success.message)},
      error => {alert(error.error.message)}
    );
    this.showChangePasswordDiv = false; 
  }

  showProfileDiv: boolean = false; 
  profileForm: FormGroup;
  showEditProfile() {
    this.showProfileDiv = true; 
    
    this.profileForm = this.formBuilder.group({
      fullName: [this.user.fullName, [Validators.required, Validators.pattern("[A-Za-z]* [A-Za-z]*")]],
      age: [this.user.age, [Validators.required, Validators.pattern("[1-9][0-9]")]],
      gender: [this.user.gender,[Validators.required]],
      mobile: [this.user.mobile, [Validators.required, Validators.pattern(/^[5-9]\d{9}$/)]],
      email: [this.user.email, []],
      batch: [this.user.batchName, []],
      address: [this.user.address, []],
      city: [this.user.city, []],
      state: [this.user.state, []],
      country: [this.user.country, []],
      pinCode: [this.user.pinCode, [Validators.pattern(/\d{6}/)]],
    });
  }

  editProfile() {
    if(this.profileForm.invalid){
      console.log("Invalid form. ");
    } else {
    //alert(JSON.stringify(this.profileForm.value, null, 4));
    let req = this.dietService.updateDietUser(this.profileForm.value);
    req.subscribe(
      success => {alert("Data updated successfully.")},
      error => {console.log(error.message)}
    );
    }
  }

  onReset() {
    this.submitted = false;
    this.changePasswordForm.reset();
    this.showChangePasswordDiv = false; 
  }

  profileReset() {
    this.submitted = false;
    this.profileForm.reset();
    this.showProfileDiv = false;
  }

  logout(){
    this.authService.logout();
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
