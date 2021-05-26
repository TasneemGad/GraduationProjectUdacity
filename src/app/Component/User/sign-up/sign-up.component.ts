import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor( private fb: FormBuilder) { }
  RegisterForm:FormGroup
 
  hide = true;  
 

  getErrorMessage() {
    if (this.RegisterForm.get('Name')?.hasError('required')) {

      return 'You must enter a value';
    }

    return this.RegisterForm.get('Name')?.hasError('Name') ? 'Not a valid Name' : '';
  }

  getErrorMessage2() {
    if (this.RegisterForm.get('ConfirmPassword')?.hasError('required')) {

      return 'You must enter a value';
    }

    return this.RegisterForm.get('ConfirmPassword')?.hasError('ConfirmPassword') ? 'Not a valid value' : '';
  }

  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(15)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  
    })
  }
  get Name() {
    return this.RegisterForm.get('Name');
  }
}
