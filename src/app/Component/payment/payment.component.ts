import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { PaymentService } from 'src/app/Services/Payment.service';
import { IPayment } from 'src/app/SharedModels/Interface/IPayment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  errMsg: string;
  get formFields() { return this.paymentForm.controls; }
  constructor( private _formBuilder: FormBuilder, 
    private _paymentService: PaymentService,
    private _router: Router,private auth:AuthenticationService) {
   
   }
   ngOnInit(): void {
 
    //bulid payment form
    this.paymentForm = this._formBuilder.group({
      cardOwnerName: ['', Validators.required],
      CardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("[0-9]+")]],
      ExperationDate: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("[0-9]+")]],
    });
 
  }
  addPayment() {
    let newPayment: IPayment =
    {
      id: 0,
      
      CardNumber: this.formFields.CardNumber.value,
      cvc: this.formFields.cvc.value,
      ExperationDate: this.formFields.ExperationDate.value,
      ApplicationStudentIdentity_Id:this.auth.getUserId()
 
    };
 
    this._paymentService.addNewPayment(newPayment)
      .pipe(first())
      .subscribe(
        data => {
          alert("Payment Add")
        },
        error => {
          this.errMsg = error;
        });
  }}