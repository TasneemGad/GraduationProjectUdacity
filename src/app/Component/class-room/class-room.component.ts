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

  ngOnInit(): void {
    this.AllStdCourses();
    this.getCoursePaidAndFree();
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
            }
          )
        }
        console.log(this.CourseList)
        // this.getCoursePaidAndFree();
      }
    )
  }

  routToSetting(){
    // this.router.navigate(['../../Personal_Information'],{relativeTo:this.activeRouter}) //.navigate(['Setting/Personal_Information'])
    // this.router.navigate(['Setting/Personal_Information'],{relativeTo:this.activeRouter})
    this.router.navigate(['Setting'])
  }
  Logout(){
   this.Authservices.logout();   
     }
 getCoursePaidAndFree(){
   const i= this.CourseList
  // this.AllStdCourses()
   console.log("enter",i)
   for (let list of this.freeCoures) {
        console.log("free" ,list.price)
   }
//          if(list.price==0){
//            this.isFree=true
//            this.freeCoures.push(list)
//            console.log("free",this.freeCoures)
//          }
//          else{
//            this.isPaid=true
//            this.paidCourses.push(list)
//            console.log("paid",this.paidCourses)
//          }
//        }
     }

 }
  