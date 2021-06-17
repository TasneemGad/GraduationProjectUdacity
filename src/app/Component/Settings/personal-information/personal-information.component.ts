import { Component, OnInit } from '@angular/core';
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


  UpdateUserName(userName:string,stID:string){   
    this.accountService.UpdateStdName(userName,stID)
    console.log("User Name Updated",userName,stID)

  }
   onSubmit(){
  //   this.getNames()
  //   this.accountService.UpdateStdName(this.userInfo)
  //   console.log("User Name Updated",this.userInfo.id,this.userInfo.userName)
   }
getNames(){
  console.log("Model")
  this.userInfo.id=this.UserForm.value.id
    this.userInfo.userName=this.UserForm.value.userName
  //   console.log("User Name Updated",this.userInfo.id,this.userInfo.userName)

}
}
