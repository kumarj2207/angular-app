import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChallengerService } from '../services/challenger.service';
import { BatchService } from '../services/batch.service';
import { error } from 'protractor';

@Component({
  selector: 'app-motivator',
  templateUrl: './motivator.component.html',
  styleUrls: ['./motivator.component.css']
})
export class MotivatorComponent implements OnInit {

  referralId: number;
  batchId: number;
  displayedColumns: string[] = ['referralId', 'fullName', 'age', 'mobile', 'email', 'address', 'city', 'state'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  errorMessage: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private batchService: BatchService,
    ) {this.dataSource = new MatTableDataSource(); }

  
  ngOnInit(): void {
    this.batchId = this.route.snapshot.params['id'];
    this.getMotivatorsByBatchId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dietUsers: any[] =[];
  getMotivatorsByBatchId() {
    let req = this.batchService.getMotivatorsByBatchId(this.batchId);
    req.subscribe(
      success => {
        this.dietUsers = success;
        this.dataSource = new MatTableDataSource(this.dietUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;},
    );
  }

  applyFilter(x) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMotivatorInBatch() {
    this.errorMessage = "";
    let req = this.batchService.addMotivatorInBatch(this.batchId, this.referralId);
    req.subscribe(
      success => {console.log(success);this.getMotivatorsByBatchId()},
      error => {this.errorMessage = error.error.message}
    );
  }

  removeMotivatorFromBatch() {
    this.errorMessage = "";
    let req = this.batchService.removeMotivatorFromBatch(this.batchId, this.referralId);
    req.subscribe(
      success => {console.log(success);this.getMotivatorsByBatchId()},
      error => {this.errorMessage = error.error.message}
    );
  }

  back() : void {
    this.router.navigate(['batch']);
  }

}
