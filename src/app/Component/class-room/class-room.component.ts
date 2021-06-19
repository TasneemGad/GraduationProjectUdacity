import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {
freeCoures:ICourse[]=[]
paidCourses:ICourse[]=[]
  constructor(private Enrollservices:EnrollService,private courseServices:CoursesService,
    private router:Router, private activeRouter:ActivatedRoute,private Authservices:AuthenticationService) { }
  currentEnrollement:IEnrollCourse[]=[];
  CourseList:ICourse[]=[];
  isFree=false
  isPaid=false
  flag=false
  lastCourseId:any
  lastCourse:ICourse

  ngOnInit(): void {
    this.AllStdCourses();
    this.getlastActiveCourse()
    for (let list of this.CourseList) {
      console.log("free" ,list.price)
 }
  }

  AllStdCourses(){
    this.Enrollservices.getAllStdEnrolledCourses().subscribe(
      data => {
        console.log(data)
        for (let enrollCrs of data) {
            console.log(enrollCrs.courseId)
          this.courseServices.getCoursesByID(enrollCrs.courseId).subscribe(
            crsData => {
              this.CourseList.push(crsData);
              if(crsData.price==0){
                this.freeCoures.push(crsData);
              }
              else if(crsData.price>0){
                this.paidCourses.push(crsData);
              }
          
                }    )
              }
            })
      }
routToSetting(){
// this.router.navigate(['../../Personal_Information'],{relativeTo:this.activeRouter}) //.navigate(['Setting/Personal_Information'])
// this.router.navigate(['Setting/Personal_Information'],{relativeTo:this.activeRouter})
this.router.navigate(['Setting'])
}
Logout(){
this.Authservices.logout();   
}
lastActiveCourse(lastCourseId:any){
  localStorage.setItem("lastCourseId",lastCourseId)
}
getlastActiveCourse(){
  this.lastCourseId = localStorage.getItem("lastCourseId")
  this.courseServices.getCoursesByID(this.lastCourseId).subscribe(
    data => {
      this.lastCourse = data
      this.flag=true
      console.log("lastCourse",this.lastCourseId, this.lastCourse,this.flag)
    })
}

}
  
