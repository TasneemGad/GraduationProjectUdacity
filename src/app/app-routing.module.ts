import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Component/category/category.component';
import { CourseComponent } from './Component/course/course.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import {ClassRoomComponent} from './Component/User/class-room/class-room.component'
import { OrderDetailsComponent } from './Component/order-details/order-details.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { CareerPrepComponent } from './Component/career-prep/career-prep.component';
import {GovernmentComponent  } from './Component/government/government.component';
import{BecomeAnInstractorComponent } from'./Component/become-an-instractor/become-an-instractor.component';
import {OverViewComponent  } from './Component/over-view/over-view.component';
import {ApproachComponent  } from './Component/approach/approach.component';
import {SolutionComponent  } from './Component/solution/solution.component';
import { StudentSucessComponent } from './Component/student-sucess/student-sucess.component';
import { BecomeAMentorComponent } from './Component/become-amentor/become-amentor.component';
const routes: Routes = [
  {path:'Home', component: HomePageComponent},
  {path:'SignUP', component: SigINComponent},
  {path:'SignIn', component: SigINComponent},
  {path:'ClassRoom',component: ClassRoomComponent},
  {path:'school-of/:id',component:CategoryComponent},
  {path:'Course/:id', component:CourseComponent},
  {path:'Lecture/:lid', component:CourseComponent},
  {path:'orderDetails/:id', component: OrderDetailsComponent},
  {path:'payment',component:PaymentComponent},
  {path:'Government',component: GovernmentComponent},
  {path:'BecomeAnInstractor',component: BecomeAnInstractorComponent},
  {path:'OverView',component: OverViewComponent},
  {path:'Approach',component: ApproachComponent},
  {path:'Solution',component: SolutionComponent},
  {path:'career-prep',component:CareerPrepComponent},
  {path:'success',component:StudentSucessComponent},
  {path:'start-mentoring',component:BecomeAMentorComponent},


  {path:'',redirectTo:'/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
