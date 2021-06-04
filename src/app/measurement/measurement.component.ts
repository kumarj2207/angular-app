import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { saveAs } from 'file-saver';
import { ChallengerService } from '../services/challenger.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  referralId: number;

  @Input()  error: boolean = false;
  @Input()  errorMessage: string;
  measurementForm: FormGroup;
  showFileDiv: boolean = false;
  showFormDiv: boolean = false;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  closeResult: string;
  //fileInfos: Observable<any>;

  constructor(private authService: AuthService,
    private challengerService: ChallengerService,
    private modalService: NgbModal,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.referralId = Number(this.authService.getReferralId());
    this.measurementForm = new FormGroup({
      biceps:new FormControl('',[Validators.required]),
      chest: new FormControl('',[Validators.required]),
      forearms:new FormControl('',[Validators.required]),
      height:new FormControl('',[Validators.required]),
      legs: new FormControl('',[Validators.required]),
      shoulders:new FormControl('',[Validators.required]),
      thighs: new FormControl('',[Validators.required]),
      waist:new FormControl('',[Validators.required]),
      weight: new FormControl('',[Validators.required])
    });
  }

  measurements: any;
  @Output() childFunction: EventEmitter<any> = new EventEmitter();
  showMeasurementDiv(): void {
    alert("Measurement added.");
    //this.measurementForm.setValue({"biceps":'',
    //"chest": '',
    //"forearms": '',
    //"height":'',
    //"legs":'',
    //"shoulders":'',
    //"thighs":'',
    //"waist":'',
    //"weight":''});
    this.measurementForm.reset();
    let req = this.challengerService.getMeasurement();
    req.subscribe(
      success => { this.measurements = success; this.childFunction.emit(this.measurements)},
      error => {this.error=true; this.errorMessage=error.message}
    );
  }



  addMeasurement() {
    if (this.measurementForm.invalid) {
      this.errorMessage = "Some problem in form.";
      this.error = true;
    } else {
      //console.log(this.measurementForm.value); 
      let req = this.challengerService.addMeasurement(this.measurementForm.value);
      req.subscribe(
        success => {this.showMeasurementDiv()},
        error => {this.error=true; this.errorMessage=error.message}
      );
    }
  }

  toggle(str: string) {
    if (str === "yes") {
      this.showFileDiv = true;
      this.showFormDiv = false;
    } else {
      this.showFileDiv = false;
      this.showFormDiv = true;
    }
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.errorMessage = "";
    this.error = false;
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.challengerService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          //this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        console.log(err);
        this.progress = 0;
        this.errorMessage = 'Could not upload the file!';
        this.error = true;
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  download(): void {
    this.errorMessage = "";
    this.error = false;

    let req = this.challengerService.download();
    
    req.subscribe(
      data => {saveAs(data, 'sample.xlsx')},
      error => {
        this.error = true;
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'Could not download the file! ' + error.error.message;
        } else {
          this.errorMessage = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
        }
      },
      () => {}
      );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.closeResult);
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      //data: {name: this.name, animal: this.animal}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      //this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  closeResult: string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private challengerService: ChallengerService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.challengerService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          //this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        console.error(err);
        this.progress = 0;
        this.currentFile = undefined;
        if (err.error instanceof ErrorEvent) {
          this.message = 'Could not upload the file! ' + err.error.message;
        } else {
          this.message = `Backend returned code ${err.status}, ` + `body was: ${err.message}`;
        }
      });
    this.selectedFiles = undefined;
  }

  download(): void {
    let req = this.challengerService.download();
    
    req.subscribe(
      data => {saveAs(data, 'sample.xlsx')},
      error => {
        if (error.error instanceof ErrorEvent) {
          this.message = 'Could not download the file! ' + error.error.message;
        } else {
          this.message = `Backend returned code ${error.status}, ` + `body was: ${error.message}`;
        }
      },
      () => {}
      );
  }  

}