import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BatchService } from '../services/batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  //retUser: ReturnedUser;  
  showBat: boolean = true;
  error: boolean = false;
  errorMessage: string;
  addBatchForm: FormGroup;
  divIdToBeDisplayed: number = 0;
  batchResponseVO: any;
  
    constructor(private authService: AuthService,
      private router: Router,
      private batchService: BatchService) { }
  
    ngOnInit(): void {
      //this.retUser = this.authService.getReturnedUser();
      this.addBatchForm = new FormGroup({
        name:new FormControl(''),
        parentBatch: new FormControl('')
      });
      this.batchService.getAllParentBatch().subscribe(
        success => {this.batchResponseVO = success;},
        error => {this.errorMessage = error.message;this.error = true}
      );
    }


  showBatches(): void {
    this.errorMessage=""; 
    this.error = false;
    this.batchService.getAllParentBatch().subscribe(
      success => {this.batchResponseVO = success;},
      error => {  this.errorMessage=error; this.error = true}
    );
    this.showBat = true;
  }

  groupResponseVO: any;
  getGroups(id: number): void {
    this.errorMessage=""; 
    this.error = false;
    this.divIdToBeDisplayed = id;
    this.batchService.getGroup(id).subscribe(
      success => {this.groupResponseVO = success;},
      error => {  this.errorMessage=error; this.error = true}
    );
    //this.showBatches();
   }

  batch: any;
  showAddBatch: boolean = false;
  showAddBatchForm(action: string, id: number): void {
    this.errorMessage=""; 
    this.error = false;
    if(action == 'add'){
      this.addBatchForm.setValue({"name": '', "parentBatch": ''});
    }
    this.showBat = false;
    this.showAddBatch = true;
  }
 
  addBatch(): void {
    this.errorMessage=""; 
    this.error = false;
    this.batchService.addBatch(this.addBatchForm.get('name').value, this.addBatchForm.get('parentBatch').value).subscribe(
      success => {this.showAddBatch = false;this.showBatches()},
      error => {this.errorMessage=error.error.message; this.error = true}
    );
  }

  cancel(): void {
    // this.router.navigate(['employees']);
    this.errorMessage=""; 
    this.error = false;
    this.showBat = true;
    this.showAddBatch = false;
   }

  back() : void {
    this.router.navigate(['admindashboard']);
  }

  challengers(batchId: number) : void {
    this.router.navigate(['challenger', batchId]);
  }

  motivators(batchId: number) : void {
    this.router.navigate(['motivator', batchId]);
  }

}
