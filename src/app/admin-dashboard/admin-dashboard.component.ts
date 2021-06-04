import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'protractor';
import { Role } from '../model/role.enum';
import { AuthService } from '../services/auth.service';
import { BatchService } from '../services/batch.service';
import { ChallengerService } from '../services/challenger.service';
import { HttpClientDietService } from '../services/http-client-diet.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userName: string;
  displayedColumns: string[] = ['referralId', 'fullName', 'age', 'mobile', 'address', 'city', 'state', 'role', 'batch', 'action'];
  error: boolean = false;
  errorMessage: string;

  motivatorForm: FormGroup;
  addFlag: boolean = false;
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private authService: AuthService,
    private dietService: HttpClientDietService,
    private batchService: BatchService,
    private challengerService: ChallengerService,
    public dialog: MatDialog,
    private interactionService: InteractionService
    ) { this.dataSource = new MatTableDataSource(this.dietUsers);}

  ngOnInit(): void {
    this.userName = this.authService.getAuthenticatedUser();
    this.getAllDietUsers();
    this.motivatorForm = new FormGroup({
      fullName:new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.required]),
      address: new FormControl(''),
      city:new FormControl(''),
      state: new FormControl(''),
      country:new FormControl(''),
      pinCode: new FormControl('')
    });
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  dietUsers: any[] =[];
  getAllDietUsers() {
    let req = this.dietService.getAllDietUsers();
    req.subscribe(
      success => {this.dietUsers = success;
        this.dataSource = new MatTableDataSource(this.dietUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;},
      error => {this.error = true; this.errorMessage = error.message}
    );
  }

  
  deleteEmp(id) : void {
    let req =   this.dietService.deleteDietUser(id);
    req.subscribe(
        success => {this.getAllDietUsers();},
        error => {this.error = true; this.errorMessage = error.error.message}
      );
  }

  applyFilter(x) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAdd() {
    this.error = false; this.errorMessage = "";
    this.motivatorForm.setValue(
      {
        fullName:'',
        age: '',
        gender:'',
        mobile:'',
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: ''
    });
    this.addFlag = true;
  }

  addMotivator() {
    this.error = false; this.errorMessage = "";
    this.addFlag = false;
    if (this.motivatorForm.invalid) {
      this.errorMessage = "Some problem in form.";
      this.error = true;
    } else {
      //console.log(this.motivatorForm.value); 
      let req = this.dietService.addMotivator(this.motivatorForm.value);
      req.subscribe(
        success => {this.getAllDietUsers()},
        error => {this.error = true; this.errorMessage = error.message}
      );
    }
  }

  cancel() {
    this.error = false; this.errorMessage = "";
    this.addFlag = false;
  }

  delete(id: number) {
    let req = this.dietService.deleteDietUser(id);
      req.subscribe(
        success => {this.getAllDietUsers()},
        error => {this.error = true; this.errorMessage = error.message}
      );
  }

  measurements: any;
  getChallengerMeasurement(referralId: number) {
    let req = this.challengerService.getChallengerMeasurement(referralId);
    req.subscribe(
      success => { this.measurements = success},
      error => {this.error = true; this.errorMessage = error.message}
    );
  }

  batchIds: number[] = [];
  
  openDialog(referralId: number, fullName: string, role: string): void {
    if(role == Role.CHALLENGER){
      this.challengerService.getChallenger(referralId).subscribe(
        success => {alert(`Batch of ${role} ${fullName} is ${success.batch.name}`)},
        error => {this.error = true; this.errorMessage = error.error.message}
      );
    }
    if(role == Role.MOTIVATOR){
      this.batchService.getAllBatch().subscribe(
        success => {
                      const dialogRef = this.dialog.open(BatchMotivatorDialog, {
                        width: '500px',
                        data: {referralId: referralId, batches: success, fullName: fullName,
                                role: role, selected: []}
                      });
                    
                      dialogRef.afterClosed().subscribe(result => {
                        this.batchIds = result;
                        console.log('The dialog was closed ' + this.batchIds.length);
                        if(this.batchIds.length > 0){
                          this.batchService.assignBatchToMotivator(referralId, this.batchIds).subscribe();
                        }
                      });
                  },
        error => {this.error = true; this.errorMessage = error.error.message}
      );
    }
  }

  sendMessage() {
    console.log("hhhh");
    this.interactionService.sendMessage("Hello Challenegr.");
  }

  logout(){
    this.authService.logout();
  }  
}

export interface DialogData {
  referralId: number;
  batches: any;
  fullName: string, 
  role: string
  selected: number[];
}

@Component({
  selector: 'batch-motivator-dialog',
  templateUrl: 'batch-motivator-dialog.html',
})
export class BatchMotivatorDialog {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BatchMotivatorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  close(): void {
    this.dialogRef.close();
  }

  save(temp: string) {
    this.dialogRef.close(temp);
  }
 
}
