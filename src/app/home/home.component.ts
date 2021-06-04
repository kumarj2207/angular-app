import { Component, OnInit } from '@angular/core';

//import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientEmployeeService } from '../services/http-client-employee.service';

import { Employee } from '../model/employee';
import { IdproviderService } from '../services/idprovider.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag: boolean = false;
  addFlag: boolean = false;
  items: any[];
  
  count: number = 0;
  empid: number = -1;
  employeename : string;
  location : string;
  email : string;
  mobile : string;
  statusCode : number;
  show : boolean = false;
  action: string;

  constructor(
    private employeeService: HttpClientEmployeeService,
    private idprovider: IdproviderService) { }

  ngOnInit(): void {
    
  }

 public showAdd() : void {
    this.flag = false;
    this.addFlag = true;
   //this.router.navigate(['employees']);
    this.employeename = '';
    this.location = '';
    this.email = '';
    this.mobile = '';  
    this.empid = -1;
    this.action = "add";
 }

  public showUpdate(id: number) : void {
   //this.router.navigate(['add']);
   let e: Employee = null;
   this.employeeService.getEmployee(id).subscribe(
     data => {
    this.employeename = data.name;
    this.location = data.location;
    this.email = data.email;
    this.mobile = data.mobile;
     }
  );
    this.empid = id;
    this.action = "update";
   this.flag = false;
   this.addFlag = true;       
 }

   public showDetail(id: number) : void {
      this.showUpdate(id);   
       this.show = true;
       this.addFlag = false;
   }

   getEmployees() : void {
      this.count = 0;
      this.items = []; 
    let emps: Employee[] = [];
      this.employeeService.getEmployees()
      .subscribe(
        (data: any[])=>{
          for (let key in data) {
            emps[this.count] = data[key];
            this.count++;
          }
        });
        this.flag = true;
        this.addFlag = false;
        this.items = emps;
  }

  common(form : NgForm) : void {
    if (this.action == "add") {
      this.addEmployee();
    }
    if (this.action == "update") {
      this.updateEmployee();
    }
  }

    addEmployee() : void {
        this.count = 0;
        this.items = [];      
    let employee : Employee ;
    this.employeeService.addEmployee(this.employeename,
        this.location,
        this.email,
        this.mobile).subscribe(
          data => {this.getEmployees();}
        );
    console.log('Employee added');
    this.flag = true;
    this.addFlag = false;
    //this.router.navigate(['employees']);
  }

    updateEmployee() : void {
    //let id = this.route.snapshot.params['id'];
    let employee : Employee = new Employee(
        this.empid,
        this.employeename,
        this.location,
        this.email,
        this.mobile
      );

    let b = confirm("Employee Updated " + this.empid); 
    if(b){
        this.employeeService.updateEmployee(employee).subscribe(
          data => {this.getEmployees();},
					errorCode => this.statusCode = errorCode
        );
     // this.router.navigate(['employees']);
        this.flag = true;
        this.addFlag = false;
    }
  } 

  cancel(): void {
   // this.router.navigate(['employees']);
    this.flag = true;
    this.addFlag = false;   
    this.show = false;
  }

    deleteEmp(id) : void {
      let e: Employee = null; 
      let statusCode: number = 0; 
      let b = confirm("Employee deleted " + id); 
      if(b){
        this.count = 0;
        this.items = [];
        this.employeeService.deleteEmployee(id).subscribe(
          data => {this.getEmployees();},
				  errorCode => statusCode = errorCode
        );
        //console.log(e.name);
        //this.router.navigate(['employees']);
      }
  }

  onKeyUp(x) { // appending the updated value to the variable 
    //this.text += x.target.value + ' | '; 
          this.count = 0;
      this.items = []; 
    let emps: Employee[] = [];
      this.employeeService.searchEmployee(x.target.value)
      .subscribe(
        (data: any[])=>{
          for (let key in data) {
            emps[this.count] = data[key];
            this.count++;
          }
        });
        this.flag = true;
        this.addFlag = false;
        this.items = emps;
  }
}
