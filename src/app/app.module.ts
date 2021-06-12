import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './MaterialDesign/material/material.module';
import { HeaderComponent } from './Layout/header/header.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './Component/category/category.component';
import { CourseComponent } from './Component/course/course.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OrderDetailsComponent } from './Component/order-details/order-details.component';
import { PaymentComponent } from './Component/payment/payment.component';
<<<<<<< HEAD
import { NavComponent } from './nav/nav.component';
=======
import { CareerPrepComponent } from './Component/career-prep/career-prep.component';
>>>>>>> 397704a3a054124f445b704a8a5457402817d5e2

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    SigINComponent,
    HomePageComponent,
    FooterComponent,
    CategoryComponent,
    CourseComponent,
    OrderDetailsComponent,
    PaymentComponent,
<<<<<<< HEAD
    NavComponent
=======
    CareerPrepComponent
>>>>>>> 397704a3a054124f445b704a8a5457402817d5e2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
