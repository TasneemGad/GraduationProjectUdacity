import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';

const routes: Routes = [
  {path:'Home', component: HomePageComponent},

  {path:'SignUP', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
