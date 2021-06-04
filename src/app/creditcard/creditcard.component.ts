import { Component, OnInit } from '@angular/core';
import { Credit } from '../model/credit';
import { HttpClientEmployeeService } from '../services/http-client-employee.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  credit : Credit = null;
  pan: string;
  eligible: boolean = false;
  error: boolean = false;

  constructor(private employeeService: HttpClientEmployeeService) { }

  ngOnInit(): void {
  }

  checkEligibility(form: NgForm): void {
    console.log(form.control.get('pan').value);
    this.employeeService.checkEligibility(this.pan).subscribe(
      success => {this.credit = success; this.eligible = success.score >= 5.0; this.error = false},
      error => {this.error = true; this.credit = null}
    );
  }

}
