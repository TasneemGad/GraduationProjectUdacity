import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Component/category/category.component';
import { CourseComponent } from './Component/course/course.component';
import { HomePageComponent } from './Component/HomePage/home-page/home-page.component';
import { SigINComponent } from './Component/User/sig-in/sig-in.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import { ClassRoomComponent } from './Component/class-room/class-room.component'
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
import { LessonContentComponent } from './Component/lectures&Lesson/lesson-content/lesson-content.component';

const routes: Routes = [
  // Routing
  { path: 'Home', component: HomePageComponent, data: { footer: true, header: true } },
  //User Login 
  { path: 'SignUP', component: SigINComponent },
  { path: 'SignIn', component: SigINComponent },
  { path: 'ClassRoom', component: ClassRoomComponent },
    //Category && Course
  { path: 'school-of/:name', component: CategoryComponent, data: { footer: true, header: true } },
  { path: 'Course/:id', component: CourseComponent, data: { footer: true, header: true } },

  // Payment 
  { path: 'orderDetails', component: OrderDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  // Setting  
  {
    path: 'Setting', component: SettingsComponent,
    children: [
      { path: "Personal_Information", component: PersonalInformationComponent },
      { path: "newPassword", component: NewPasswordComponent },
      { path: "Notification", component: NotificationsComponent },
      { path: "LinkedAccount", component: LinkedAccountComponent },
      { path: "LanguagePreference", component: LanguagePreferenceComponent },
      { path: "SubscriptionsBilling", component: SubscriptionsBillingComponent },
      { path: "Courses", component: CoursesComponent },
    ]
  },

  //Lectures
  //   {path:"Lectures",component:LecturesComponent,
  //      children:[{path:"Lesson",component:LessonsComponent},
  //   //  {path:'Lecture/:id', component:LecturesComponent},
  // ]},
  // {path:"Lectures",component:LecturesComponent,children:[{path:"Courses",component:CoursesComponent}]},
  { path: 'Lecture/:id', component: LecturesComponent,
    children:
      [// [{path:"Lesson/:id",component:LessonsComponent},
<<<<<<< HEAD
        { path: "SpasificLecture/:id", component: LecturesComponent },
        {path:"coreCurriculum/:id",component:CoreCurriculumComponent},
      ]
=======
        // { path: "SpasificLecture/:id", component: LecturesComponent },
        {path:"coreCurriculum/:id",component:CoreCurriculumComponent},
        {path:"ProgramHome/:id",component:ProgramHomeComponent},
        { path: "Lesson/:id", component: LessonsComponent,}]
>>>>>>> 545882aaace2a7077418e2e64151ba5c6b7f1bfe
  },
  // {path:"coreCurriculum",component:CoreCurriculumComponent},

  { path: "lessonContent/:id", component: LessonContentComponent },
  
  //Nothing
  { path: '', redirectTo: '/Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
