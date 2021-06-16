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
  stdID:string;
  UserForm:FormGroup;
  constructor(private accountService:AccountService,private tokenUser:AuthenticationService,private fb: FormBuilder) { }

   
  ngOnInit(): void {
    this.UserForm = this.fb.group({
      userNamehidde: ['', [Validators.required, Validators.maxLength(15)]]
    })
    this.getStdInformation();
    
  }

 
  getStdInformation(){
    this.stdID=this.tokenUser.getUserId();

      this.accountService.getStudentInformation(this.stdID).subscribe(
        data=>{
            console.log("dddddddddddddddddd",data)
            this.userInfo=data;
        }
      )
  }
  onSubmit(){    
    // this.accountService.UpdateStdName()
    // console.log("User Name Updated")
    this.UpdateUserName(this.UserForm.value)
  }

  UpdateUserName(userName:string){    
    this.accountService.UpdateStdName(userName)
    console.log("User Name Updated")
  }

}
