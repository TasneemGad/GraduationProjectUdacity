import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegistrationService } from 'src/app/Services/registration.service';
import { ILogin } from 'src/app/SharedModels/Interface/ILogin';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private _registerService: any;
  constructor( private fb: FormBuilder, private signUpService:RegistrationService, private router:Router,private _router: Router,
) { }
  RegisterForm:FormGroup
  user: ILogin;
  loading = false;
  error = '';
  hide = true;  
  isSignUpFailed = false;
  isSuccessful=false;
  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.maxLength(15)]],
      Email:['', [Validators.required, Validators.maxLength(15)]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]],  
    })
  }
  get formFields() { return this.RegisterForm.controls; }

  onSubmit() {
    console.log("log")
    const user = this.RegisterForm.value;
    this.signUpUser(user);
  }
  signUpUser(user: ILogin) {
    this.signUpService.SignUp(user).subscribe( data => {
      console.log("success")
      this.router.navigate(['/ClassRoom']);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      },err=>{
        console.log("error")
        this.error=err.message;
        this.isSignUpFailed = true;
      
      })
        this.loading = true;
     
  }


  getErrorMessage() {
    if (this.RegisterForm.get('Email')?.hasError('required')) {

      return 'You must enter a value';
    }

    return this.RegisterForm.get('Email')?.hasError('Email') ? 'Not a valid Email' : '';
  }

  getErrorMessage2() {
    if (this.RegisterForm.get('ConfirmPassword')?.hasError('required')) {

      return 'You must enter a value';
    }

    return this.RegisterForm.get('ConfirmPassword')?.hasError('ConfirmPassword') ? 'Not a valid value' : '';
  }

  

  get UserName() {
    return this.RegisterForm.get('UserName');
  }
  get Email() {
    return this.RegisterForm.get('Email');
  }
  get PasswordHash() {
    return this.RegisterForm.get('PasswordHash');
  }
}
