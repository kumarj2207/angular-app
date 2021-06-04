import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {  formatNumber } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReturnedUser } from '../model/returnedUser';
import { RegisteredUser } from '../model/registeredUser';
import { HttpClientDietService } from '../services/http-client-diet.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  fullName: string ;
	age: number;
	gender: string = 'M';
	mobile: string;
  email: string;
  address: string;
	city: string;
	state: string;
	country: string;
	pinCode: string;
	height: number;
	weight: number;
	reason: string;
	anyExistingMedicalConditions: boolean = false;
	anyExistingDietaryRestrictions: boolean = false;
	pregnantStatus: string;
  dietaryCustom: string = 'VEG';
  pregnancyFlag: boolean;
  referralId: number;
  success: boolean = false;
  error: boolean = false;

  constructor(@Inject(LOCALE_ID) private locale: string, 
              
              private router: Router,
              private dietService: HttpClientDietService) { }

  ngOnInit(): void {  }

  submit(): void { 
    let regUser : RegisteredUser = {fullName:this.fullName,
      age:this.age,
      gender: this.gender,
      mobile: this.mobile,
      email: this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      country: this.country,
      pinCode: this.pinCode,
      height: Number(formatNumber(this.height, this.locale, '3.2-2')),
      weight: Number(formatNumber(this.weight, this.locale, '3.0-3')),
      reason: this.reason,
      anyExistingDietaryRestrictions:this.anyExistingDietaryRestrictions,
      anyExistingMedicalConditions: this.anyExistingMedicalConditions,
      pregnantStatus: this.pregnantStatus == "yes",
      dietaryCustom: this.dietaryCustom,
      referralId: this.referralId};

      this.dietService.register(regUser).subscribe(
        success => {this.success = true; this.error = false},
        error => {this.error = true; this.success = false}
        );
   }

  cancel(): void {
    this.router.navigate([''])
   }

   togglePregnancy(e): void {
    let gender = e.target.value;
     if (gender == 'M') {
       this.pregnancyFlag = false;
       this.pregnantStatus = "na";
     } else {
      this.pregnancyFlag = true;
     }
   } 

}
