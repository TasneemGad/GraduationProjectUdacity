import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IAccount } from 'src/app/SharedModels/Interface/iaccount';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  userInfo:IAccount;
  stdID:string=this.tokenUser.getUserId();
  UserForm:FormGroup;
  alertFlag=false;
  apiUrl="https://localhost:44326";

  public response: {dbPath: ''};

  constructor(private accountService:AccountService,private tokenUser:AuthenticationService,private fb: FormBuilder) { }

   
  ngOnInit(): void {
    this.UserForm = this.fb.group({
      id: [''],
      userName:['']
    })
        this.getStdInformation();
    
  }
  // name(){
  // return  this.UserForm.get('userName');
  // }
  // Id(){
  //  return this.UserForm.get('id');
  // }
 
  getStdInformation(){
    this.stdID=this.tokenUser.getUserId();

      this.accountService.getStudentInformation(this.stdID).subscribe(
        data=>{
            console.log("dddddddddddddddddd",data)
            this.userInfo=data;
            console.log("usetd",this.userInfo.userName,this.userInfo.id)
        }
      )
  }


  UpdateUserInfo(userName:string,email:string,tel:string){  
  this.accountService.getStudentInformation(this.tokenUser.getUserId()).subscribe(
    data=>{    
    console.log("enter")        
        data.userName=userName
        data.email=email
        data.phoneNumber=tel;
    this.accountService.UpdateStInfo(data).subscribe(
      testObj=>{
        console.log("test",testObj)
        this.alertFlag=true;
      }
    )

        console.log(data)         
      }
    )
    console.log("User Name Updated",userName,email,tel)

  }
getNames(){
  console.log("Model")
  this.userInfo.id=this.UserForm.value.id
    this.userInfo.userName=this.UserForm.value.userName
}
  
  // upload image
   public uploadFinished = (event:any) => { 
     this.response = event;
     this.accountService.getStudentInformation(this.tokenUser.getUserId()).subscribe(
      data=>{
        data.image=this.response.dbPath
        console.log("Done",data)
        this.accountService.UpdateStInfo(data).subscribe(
          sucess=>{
            console.log("Done")
          }
        )
      }
    )
     console.log(this.response)
   }

   public createImgPath = (serverPath: string) => {
        console.log(`${this.apiUrl}/${serverPath}`)
     return `${this.apiUrl}/${serverPath}`;
  }
}
