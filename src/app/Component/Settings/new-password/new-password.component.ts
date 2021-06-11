import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  constructor(private fb:FormBuilder) { }

   newPasswordForm:FormGroup

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
  onSubmit(){
  }
}
