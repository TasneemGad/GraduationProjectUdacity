import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import {ClassRoomComponent} from './Component/User/class-room/class-room.component'

const routes: Routes = [
  {path:'Home', component: HomePageComponent},
  {path:'SignUP', component: SignUpComponent},
  {path:'SignIn', component: SigINComponent},
  {path:'ClassRoom',component: ClassRoomComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
