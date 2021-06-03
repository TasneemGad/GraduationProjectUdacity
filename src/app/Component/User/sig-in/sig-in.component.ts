import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigINComponent implements OnInit {
  RegisterForm:FormGroup

  constructor(private fb: FormBuilder) { }


  getErrorMessage() {
    if (this.RegisterForm.get('Name')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.RegisterForm.get('Name')?.hasError('Name') ? 'Not a valid Name' : '';
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
