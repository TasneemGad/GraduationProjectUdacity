import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  constructor(private Enrollservices:EnrollService,private courseServices:CoursesService,
    private router:Router, private activeRouter:ActivatedRoute,private Authservices:AuthenticationService) { }
  currentEnrollement:IEnrollCourse[]=[];
  CourseList:ICourse[]=[];

  ngOnInit(): void {
    this.AllStdCourses();
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
      }
    )
  }

  routToSetting(){
    this.router.navigate(['../../Personal_Information'],{relativeTo:this.activeRouter}) //.navigate(['Setting/Personal_Information'])
    // this.router.navigate(['Setting/Personal_Information'],{relativeTo:this.activeRouter})
  }
  // Logout(){
  //   this.Authservices.logout()    
  //   }
}
