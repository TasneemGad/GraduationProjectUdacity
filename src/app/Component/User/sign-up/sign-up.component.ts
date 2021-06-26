import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { RegistrationService } from 'src/app/Services/registration.service';
import { ILogin } from 'src/app/SharedModels/Interface/ILogin';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private _registerService: any;
  userNaa: { User: string; pass: string; };
  isLoggedIn: any;
  Role: string;
  constructor( private fb: FormBuilder, private signUpService:RegistrationService, private router:Router,private _router: Router,
    private auth:AuthenticationService,) { }
  RegisterForm:FormGroup
  user: ILogin;
  loading = false;
  error = '';
  hide = true;  
  isSignUpFailed = false;
  isSuccessful=false;
  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.maxLength(30)]],
      Email:['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(6),Validators.pattern("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[`~!@#$%^&\\\\*\\\\(\\\\)\\\\-_=\\\\+\\\\{\\\\}\\\\[\\\\]|\\\\\\\\:/]).{6,}")]],  
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
      this.auth.login(this.formFields.UserName.value, this.formFields.PasswordHash.value)
      .pipe(first())
      .subscribe(
          AData => {
             
             this.isLoggedIn= this.auth.isLoggedIn();
              console.log("llllllllllllllllllllllllllllll");
              this.Role=this.auth.getRole();        
          console.log("Roleeeeeeeeeeeeeeee",this.Role);

              if(this.Role==='Student')
              {
               this.StudentPage();
              }
              else
              {
                this.AdminPage();
              }


          },
          error => {
              this.loading = false;
              this.error = error.message;
             
          });
    //  this.router.navigate(['/ClassRoom']);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      },err=>{
        console.log("error")
        this.error=err.message;
        this.isSignUpFailed = true;
      
      })
        this.loading = true;
       
     
  }
  AdminPage() {
    window.location.href='/AboutAs';
  }
  StudentPage() {
    window.location.href='/ClassRoom';

  }

  

  getErrorMessage() {
    if (this.RegisterForm.get('Email')?.hasError('required')) {

      return 'Must be specified';
    }
  else{
    return this.RegisterForm.get('Email')?.hasError('email') ? 'Not a valid Email' : '';
  }
  }

  
  getErrorMessageName() {
    if (this.RegisterForm.get('UserName')?.hasError('required')) {

      return 'Must be specified';
    }

    return this.RegisterForm.get('UserName')?.hasError('UserName') ? 'Not a valid UserName' : '';
  }
  
  get UserName() {
    return this.RegisterForm.get('UserName');
  }
  get Email() {
    return this.RegisterForm.get('Email');
  }
  get passwordHash() {
    return this.RegisterForm.get('passwordHash');
  }
}
