import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Component/category/category.component';
import { CourseComponent } from './Component/course/course.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import { ClassRoomComponent } from './Component/class-room/class-room.component';
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
import { LessonsComponent } from './Component/lectures&Lesson/lessons/lessons.component';
import { CoreCurriculumComponent } from './Component/lectures&Lesson/core-curriculum/core-curriculum.component';
import { ProgramHomeComponent } from './Component/lectures&Lesson/program-home/program-home.component';
import { ResourcesComponent } from './Component/resources/resources.component';
import { LessonContentComponent } from './Component/lectures&Lesson/lesson-content/lesson-content.component';
import { AboutASComponent } from './Component/about-as/about-as.component';
import { CatalogComponent } from './Component/catalog/catalog.component';
import {UploadComponent} from './reusableComponents/upload/upload.component';
import {CorporateSocialResponsibilityComponent} from './Component/corporate-social-responsibility/corporate-social-responsibility.component';

import { AdminDashBoardComponent } from './Admin-DashBoard/admin-dash-board/admin-dash-board.component';
import { LecturesAdminComponent } from './Admin-DashBoard/lectures-admin/lectures-admin.component';
import { LessonContentAdminComponent } from './Admin-DashBoard/lesson-content-admin/lesson-content-admin.component';
import { SubCategoryComponent } from './Admin-DashBoard/sub-category/sub-category.component';
import { CategoryAdminComponent } from './Admin-DashBoard/category-admin/category-admin.component';
import { CourseAdminComponent } from './Admin-DashBoard/course-admin/course-admin.component';
import { LessonAdminComponent } from './Admin-DashBoard/lesson-admin/lesson-admin.component';
import { PageNotFoundComponent } from './Component/page-not-found/page-not-found.component';
import { CourseVideosComponent } from './Admin-DashBoard/course-videos/course-videos.component';
import { QuestionGroupAdminComponent } from './Admin-DashBoard/question-group-admin/question-group-admin.component';
import { QuestionOptionesAdminComponent } from './Admin-DashBoard/question-optiones-admin/question-optiones-admin.component';
import { TrueAndFalsesAdminComponent } from './Admin-DashBoard/true-and-falses-admin/true-and-falses-admin.component';


const routes: Routes = [
  // Routing
  {
    path: 'Home',
    component: HomePageComponent,
    data: { footer: true, header: true },
  },
  //User Login
  { path: 'SignUP', component: SigINComponent },
  { path: 'SignIn', component: SigINComponent },

  //Category && Course
  { path: 'school-of/:name', component: CategoryComponent, data: { footer: true, header: true } },
  { path: 'Course/:id', component: CourseComponent, data: { footer: true, header: true } },
  { path: 'Resources', component:ResourcesComponent, data: { footer: true, header: true }},

  { path: 'AboutAs', component:AboutASComponent, data: { footer: true, header: true }},
  {path:'CorporateSocialResponsibility', component:CorporateSocialResponsibilityComponent, data: { footer: true, header: true }},
  { path: 'Upload', component:UploadComponent, data: { footer: true, header: true }},

  // Payment 
  { path: 'orderDetails', component: OrderDetailsComponent },
  { path: 'payment', component: PaymentComponent },

  //ClassRoom
  { path: 'ClassRoom', component: ClassRoomComponent },
  { path:'course/all', component:CatalogComponent, data: { footer: true, header: true }},

  // Setting
  {
    path: 'Setting',
    component: SettingsComponent,
    children: [
      { path: 'Personal_Information', component: PersonalInformationComponent },
      { path: 'newPassword', component: NewPasswordComponent },
      { path: 'Notification', component: NotificationsComponent },
      { path: 'LinkedAccount', component: LinkedAccountComponent },
      { path: 'LanguagePreference', component: LanguagePreferenceComponent },
      {
        path: 'SubscriptionsBilling',
        component: SubscriptionsBillingComponent,
      },
      { path: 'Courses', component: CoursesComponent },
    ],
  },

  //Lectures
  {
    path: 'Lecture/:id',
    component: LecturesComponent,
    children: [
      { path: 'coreCurriculum/:id', component: CoreCurriculumComponent },
      { path: 'ProgramHome/:id', component: ProgramHomeComponent },
      { path: 'Lesson/:id', component: LessonsComponent },
    ],
  },

  { path: 'lessonContent/:id',component: LessonContentComponent,
    children: [
      // { path: 'lessonData/:id', component:LessonVideeoComponent }
  ],
  },
//Admin
   {path:"DashBoard" ,component:AdminDashBoardComponent,children:[
     {path:"Lectures",component:LecturesAdminComponent},
     {path:"LessonContent",component:LessonContentAdminComponent},
     {path:"SubCategory",component:SubCategoryComponent},
     {path:"Category" ,component:CategoryAdminComponent},
     {path:"Course" ,component:CourseAdminComponent},
     {path:"Lesson" ,component:LessonAdminComponent},
     {path:"CourseVideos" ,component:CourseVideosComponent},
     {path:"QuestionGroup" ,component:QuestionGroupAdminComponent},
     { path:"TrueAndFalses" ,component:TrueAndFalsesAdminComponent},
     {path:"QuestionOptiones" ,component:QuestionOptionesAdminComponent}

   ]},
  //Nothing
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
