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

const routes: Routes = [
  {path:'Home', component: HomePageComponent},
  {path:'SignUP', component: SigINComponent},
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c87d705508289082c097a13179664b13e7ba7216
  {path:'SignIn', component: SigINComponent},
=======
  {path:'SignIn', component:SigINComponent},

>>>>>>> b72c3f96f5c1d46f81ad22523a91fdb16b1695a8
  {path:'ClassRoom',component: ClassRoomComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'school-of/:name',component:CategoryComponent},
  {path:'Course/:id', component:CourseComponent},
  {path:'Lecture/:lid', component:CourseComponent},
  {path:'orderDetails', component: OrderDetailsComponent},
  {path:'payment',component:PaymentComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
