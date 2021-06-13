import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Component/category/category.component';
import { CourseComponent } from './Component/course/course.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import {ClassRoomComponent} from './Component/class-room/class-room.component'
import { OrderDetailsComponent } from './Component/order-details/order-details.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { SettingsComponent } from './Component/Settings/settings/settings.component';
import { PersonalInformationComponent } from './Component/Settings/personal-information/personal-information.component';
import { NewPasswordComponent } from './Component/Settings/new-password/new-password.component';
import { NotificationsComponent } from './Component/Settings/notifications/notifications.component';
import { LinkedAccountComponent } from './Component/Settings/linked-account/linked-account.component';
import { LanguagePreferenceComponent } from './Component/Settings/language-preference/language-preference.component';
import { SubscriptionsBillingComponent } from './Component/Settings/subscriptions-billing/subscriptions-billing.component';
import { CoursesComponent } from './Component/Settings/courses/courses.component';
import { LecturesComponent } from './Component/lectures&Lesson/lectures/lectures.component';

const routes: Routes = [
  // Routing
  {path:'Home', component: HomePageComponent},
  //User Login 
  {path:'SignUP', component: SigINComponent},
  {path:'SignIn', component: SigINComponent},
  {path:'ClassRoom',component: ClassRoomComponent},
  {path:'school-of/:name',component:CategoryComponent},
  {path:'Course/:id', component:CourseComponent},
  
  // Payment 
  {path:'orderDetails', component: OrderDetailsComponent},
  {path:'payment',component:PaymentComponent},
  // Setting  
  {path:'Setting',component:SettingsComponent,
  children:[
 {path:"Personal_Information",component:PersonalInformationComponent},
{path:"newPassword",component:NewPasswordComponent},
{path:"Notification",component:NotificationsComponent},
{path:"LinkedAccount",component:LinkedAccountComponent},
{path:"LanguagePreference",component:LanguagePreferenceComponent},
{path:"SubscriptionsBilling",component:SubscriptionsBillingComponent},
{path:"Courses",component:CoursesComponent},]},
//Lectures
{path:"Lectures",component:LecturesComponent,children:[{path:"Courses",component:CoursesComponent}]},
{path:'Lecture/:id', component:LecturesComponent},
  //Nothing
  {path:'',redirectTo:'/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
