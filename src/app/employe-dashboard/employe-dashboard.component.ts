import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeModel } from './employe-dashboard mpdel';
@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {
 
  formValues!:FormGroup;
   Getperson:any;
    showAdd !:boolean;
   showUpdate!:boolean;

  employemodelobj:EmployeModel= new EmployeModel()
  constructor(public formbilder:FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
    this.formValues=this.formbilder.group({
      firstName:[""],
      lastName:[""],
      email:[""],
      mobile:[""],
      salary:[""],
        })
        this.getEmploye()
  }
  clickAddEmploye(){
    this.formValues.reset();
   this.showAdd=true;
   this.showUpdate=false
  }
postEmployeDetails(){
  this.employemodelobj.firstName=this.formValues.value.firstName;
  this.employemodelobj.lastName=this.formValues.value.lastName;
  this.employemodelobj.email=this.formValues.value.email;
  this.employemodelobj.mobile=this.formValues.value.mobile;
  this.employemodelobj.salary=this.formValues.value.salary;

  this.api.postEmploye(this.employemodelobj)
  .subscribe((res: any)=>{
    console.log(res);
    alert("employe added Successfully");
    let ref=document.getElementById("cancle")
    ref?.click()
    this.formValues.reset()
    this.getEmploye()
  })

}
getEmploye(){
  this.api.getEmploye()
  .subscribe((res:any)=>{
this.Getperson=res;
  })
}
deleteEmploye(row:any){
  this.api.deleteEmploye(row.id)
  .subscribe(res=>{
    alert("employe deleted successfully");
    this.getEmploye();
  })
}
onEdit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employemodelobj.id=row.id;
  this.formValues.controls['firstName'].setValue(row.firstName)
  this.formValues.controls['lastName'].setValue(row.lastName)
  this.formValues.controls['email'].setValue(row.email)
  this.formValues.controls['mobile'].setValue(row.mobile)
  this.formValues.controls['salary'].setValue(row.salary)
}
updateEmployeDetails(){
  
  this.employemodelobj.firstName=this.formValues.value.firstName;
  this.employemodelobj.lastName=this.formValues.value.lastName;
  this.employemodelobj.email=this.formValues.value.email;
  this.employemodelobj.mobile=this.formValues.value.mobile;
  this.employemodelobj.salary=this.formValues.value.salary;

  this.api.updateEmploye(this.employemodelobj,this.employemodelobj.id)
  .subscribe(res=>{
    alert("ubdate successfully");
    let ref=document.getElementById("cancle")
    ref?.click()
    this.formValues.reset()
    this.getEmploye()
  })
}
}
