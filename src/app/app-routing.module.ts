import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Component/category/category.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { TestCategoryComponent } from './Component/test-category/test-category.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';

const routes: Routes = [
  {path:'Home', component: HomePageComponent},
  {path:'SignUP', component: SigINComponent},
  {path:'SignIn', component: SigINComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'school-of/:name',component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
