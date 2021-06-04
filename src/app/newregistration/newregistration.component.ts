import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from '../model/returnedUser';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientDietService } from '../services/http-client-diet.service';
import { Applicant } from '../model/applicant';

@Component({
  selector: 'app-newregistration',
  templateUrl: './newregistration.component.html',
  styleUrls: ['./newregistration.component.css']
})
export class NewregistrationComponent implements OnInit {

  retUser: ReturnedUser;
  error: boolean = false;
  errorMessage: string;
  applicant: Applicant = {registrations:[], batches:[]};
  reaonFlag: boolean = false;
  bid: number;
  rejectionReason: string;
  email: string;
  approved: boolean;
  showReg: boolean = true;
  displayedColumns: string[] = ['name', 'gender', 'age', 'height', 'weight', 'bmi', 'joinReason', 'medCondition', 'pregnantStatus', 'action'];

  constructor(private authService: AuthService,
    private router: Router,
    private dietService: HttpClientDietService) { }

  ngOnInit(): void {
    this.retUser = this.authService.getReturnedUser();
    this.dietService.getNewRegistrations().subscribe(
      success => {this.applicant = success; this.error = false;},
      error => {this.error = true; this.applicant = null}
    );
  }

  showApproveReject(email: string, approved: boolean): void {
    this.email = email;
    this.approved = approved;
    this.bid = -1;
    this.rejectionReason = "";
    
    this.reaonFlag = true;
    this.showReg = false;
  }

  approveOrReject(): void {
    let approval:any = {
      email: this.email, approved: this.approved, batch: this.bid, rejectionReason:this.rejectionReason}; 
    //let approvalVO : any[] = [ approval ];
    this.dietService.approveOrReject(approval).subscribe(
      success => {this.showRegistrations()},
      error => {this.error = true}
      );
    this.reaonFlag = false;
    this.showReg = true;
  }

  showRegistrations() {
    this.error = false;
    this.dietService.getNewRegistrations().subscribe(
      success => {this.applicant = success; this.error = false;},
      error => {this.error = true; this.applicant = null}
    );
  }

  back() : void {
    this.router.navigate(['admindashboard']);
  }

  cancel() : void {
    this.reaonFlag = false;
    this.showReg = true;
  }
}
