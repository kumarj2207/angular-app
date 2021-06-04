import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChallengerService } from '../services/challenger.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-challenger',
  templateUrl: './challenger.component.html',
  styleUrls: ['./challenger.component.css']
})
export class ChallengerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['referralId', 'fullName', 'age', 'mobile', 'email', 'address', 'city', 'state'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private challengerService: ChallengerService,
    private interactionService: InteractionService
    ) {this.dataSource = new MatTableDataSource(); }

  
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.interactionService.dietMessage$.subscribe(
      message => {console.log(message)}
    )
    this.getChallengersByBatchId(id);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dietUsers: any[] =[];
  getChallengersByBatchId(batchId: number) {
    let req = this.challengerService.getChallengersByBatchId(batchId);
    req.subscribe(
      success => {this.dietUsers = success;this.dataSource = new MatTableDataSource(this.dietUsers);},
    );
  }

  applyFilter(x) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  back() : void {
    this.router.navigate(['batch']);
  }

}
