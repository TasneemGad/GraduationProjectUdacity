import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration.service';
import { ILogin } from 'src/app/SharedModels/Interfaces/ILogin';


@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigINComponent implements OnInit {
  LoginForm:FormGroup
  isSuccessed=false
  hide = true;  


  constructor(private fb: FormBuilder,private router: Router,private signInService:RegistrationService) { }

 onSubmit() {
    console.log("log")
    const user = this.LoginForm.value;
    this.signInUser(user);
    this.router.navigate(['/Home']);
  }

  signInUser(user: ILogin) {
    this.signInService.SignIn(user).subscribe( data => {
      console.log("success")
      this.isSuccessed = true;

      },err=>{
        console.log("error")
      })
  }

  getErrorMessage() {
    if (this.LoginForm.get('UserName')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.LoginForm.get('UserName')?.hasError('UserName') ? 'Not a valid Name' : '';
  }
  getErrorMessage2() {
    if (this.LoginForm.get('Password')?.hasError('required')) {

      return 'You must enter a value';
    }

    return this.LoginForm.get('Password')?.hasError('ConfirmPassword') ? 'Not a valid value' : '';
  }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.maxLength(15)]],
      Email: ['', [Validators.required, Validators.minLength(6)]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  get UserName() {
    return this.LoginForm.get('UserName');
  }
  get Email() {
    return this.LoginForm.get('Email');
  }
  get PasswordHash() {
    return this.LoginForm.get('PasswordHash');
  }
}
