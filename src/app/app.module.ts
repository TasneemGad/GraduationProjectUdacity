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
<<<<<<< HEAD
import { TestCategoryComponent } from './Component/test-category/test-category.component';
import { CategoryComponent } from './Component/category/category.component';

=======
import { CourseComponent } from './Component/course/course.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
>>>>>>> 556ea4f94c966695972a3411eba01c8bd6a542c0
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    SigINComponent,
    HomePageComponent,
    FooterComponent,
<<<<<<< HEAD
    TestCategoryComponent,
    CategoryComponent
=======
    CourseComponent
>>>>>>> 556ea4f94c966695972a3411eba01c8bd6a542c0
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
