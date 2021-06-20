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
import { ClassRoomComponent } from './Component/class-room/class-room.component';
import { PersonalInformationComponent } from './Component/Settings/personal-information/personal-information.component';
import { NewPasswordComponent } from './Component/Settings/new-password/new-password.component';
import { NotificationsComponent } from './Component/Settings/notifications/notifications.component';
import { SettingsComponent } from './Component/Settings/settings/settings.component';
import { LinkedAccountComponent } from './Component/Settings/linked-account/linked-account.component';
import { LanguagePreferenceComponent } from './Component/Settings/language-preference/language-preference.component';
import { SubscriptionsBillingComponent } from './Component/Settings/subscriptions-billing/subscriptions-billing.component';
import { CoursesComponent } from './Component/Settings/courses/courses.component';
import { LecturesComponent } from './Component/lectures&Lesson/lectures/lectures.component';
import { LessonsComponent } from './Component/lectures&Lesson/lessons/lessons.component';
import { LessonContentComponent } from './Component/lectures&Lesson/lesson-content/lesson-content.component';
import { CoreCurriculumComponent } from './Component/lectures&Lesson/core-curriculum/core-curriculum.component';
import { ProgramHomeComponent } from './Component/lectures&Lesson/program-home/program-home.component';
import { ResourcesComponent } from './Component/resources/resources.component';
import { LessonDataComponent } from './Component/lectures&Lesson/lesson-data/lesson-data.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutASComponent } from './Component/about-as/about-as.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogComponent } from './Component/catalog/catalog.component';
import { FormsModule } from '@angular/forms';
import { CoursesFilterPipe } from './SharedModels/Interface/course-Filter';
import { AdminDashBoardComponent } from './Admin-DashBoard/admin-dash-board/admin-dash-board.component';
import { SubCategoryComponent } from './Admin-DashBoard/sub-category/sub-category.component';

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
    ClassRoomComponent,
    PersonalInformationComponent,
    NewPasswordComponent,
    NotificationsComponent,
    SettingsComponent,
    LinkedAccountComponent,
    LanguagePreferenceComponent,
    SubscriptionsBillingComponent,
    CoursesComponent,
    LecturesComponent,
    LessonsComponent,
    LessonContentComponent,
    CoreCurriculumComponent,
    ProgramHomeComponent,
    ResourcesComponent,
    LessonDataComponent,
    AboutASComponent,
    CatalogComponent,
    CoursesFilterPipe,
    AdminDashBoardComponent,
    SubCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    FormsModule
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
