import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  constructor(private fb:FormBuilder,private accountService:AccountService,private token:AuthenticationService) { }

   newPasswordForm:FormGroup;
   password:string;
   alertFlag=false;

  getErrorMessagecurrentPassword() {
    if (this.newPasswordForm.get('currentPassword')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newPasswordForm.get('currentPassword')?.hasError('currentPassword') ? 'Not a valid currentPassword' : '';
  }
  getErrorMessagenewPassword() {
    if (this.newPasswordForm.get('newPassword')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newPasswordForm.get('newPassword')?.hasError('newPassword') ? 'Not a valid newPassword' : '';
  }
  getErrorMessageverifyPassword() {
    if (this.newPasswordForm.get('verifyPassword')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newPasswordForm.get('verifyPassword')?.hasError('verifyPassword') ? 'Not a valid verifyPassword' : '';
  }

  ngOnInit(): void {
    this.newPasswordForm=this.fb.group({
      currentPassword:['', [Validators.required, Validators.minLength(6)]],
      newPassword:['', [Validators.required, Validators.minLength(6)]],
      verifyPassword:['', [Validators.required, Validators.minLength(6)]]
    })
  }
  currentPassword(){
    return this.newPasswordForm.get('currentPassword')
  }
  updatePassword(newPassword:string,oldPassword:string){
    this.accountService.getStudentInformation(this.token.getUserId()).subscribe(
      data=>{
        data.passwordHash=newPassword;        
        this.accountService.updatePassword(data,oldPassword).subscribe(
          dataUpdate=>{
              console.log("Test",dataUpdate)
              this.alertFlag=true
          }
        )
      }
    )
      // this.accountService.updatePassword().subscribe(
      //   data=>{
      //     console.log("Done")
      //   }
      // )
  }
}
