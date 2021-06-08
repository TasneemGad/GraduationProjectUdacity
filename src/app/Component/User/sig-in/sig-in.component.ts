import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { RegistrationService } from 'src/app/Services/registration.service';
import { ILogin } from 'src/app/SharedModels/Interface/ILogin';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigINComponent implements OnInit {
  LoginForm:FormGroup
  isSuccessed=false
  hide = true;  
  loading = false;
  returnUrl: string;
  error = '';
  isLoggedIn=false
  isLoginFailed: boolean;
  errorMessage: any;
  constructor(private fb: FormBuilder,private signInService:RegistrationService, private authenticationService: AuthenticationService,private route: ActivatedRoute,
    private router: Router,) { }
    ngOnInit(): void {
       if (!this.authenticationService.isLoggedIn()) { 
         this.router.navigate(['/SignIn']);
        }
      this.LoginForm = this.fb.group({
        UserName: ['', [Validators.required, Validators.maxLength(15)]],
        Email: ['', [Validators.required, Validators.minLength(6)]],
        PasswordHash: ['', [Validators.required, Validators.minLength(6)]]
      })
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
 onSubmit() {
    console.log("log")
    const user = this.LoginForm.value;
    this.signInUser(user);
   // this.router.navigate(['/Home']);
  }
  get formFields() { return this.LoginForm.controls; }
  signInUser(user: ILogin) {
    this.signInService.SignIn(user).subscribe( _data => {
      console.log("success")
      this.isSuccessed = true;

      },_err=>{
        console.log("error")
      })

      this.loading = true;
      this.authenticationService.login(this.formFields.UserName.value, this.formFields.PasswordHash.value)
          .pipe(first())
          .subscribe(
              AData => {
                  this.router.navigate(['/ClassRoom']);
                 this.isLoginFailed = false;
                 this.isLoggedIn= this.authenticationService.isLoggedIn();
              },
              error => {
                  this.loading = false;
                  this.errorMessage = error.message;
                  this.isLoginFailed = true;
              });

           console.log(this.authenticationService.getRole());
           console.log(this.authenticationService.getUserId());

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
