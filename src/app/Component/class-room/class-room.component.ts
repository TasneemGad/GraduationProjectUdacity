import { Component, OnInit } from '@angular/core';
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

  constructor(private Enrollservices:EnrollService,private courseServices:CoursesService) { }
  currentEnrollement:IEnrollCourse[]=[];
  CourseList:ICourse[]=[];

  ngOnInit(): void {
    this.AllStdCourses();
  }
getCurrent()
{
this.Enrollservices.getStsEnrollCourse()
}

  AllStdCourses() {
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
}
