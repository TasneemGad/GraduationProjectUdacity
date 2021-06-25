import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  lectureList:Lectures[]
  lectureAllList:Lectures[]
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private Enrollservices:EnrollService,private courseServices:CoursesService) { }
    
    CourseList:ICourse[]=[];

    // idUrl:any
  ngOnInit(): void {

    this.AllStdCourses();
    
    // this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    // this.getLecturesByID(this.idUrl);
    // this.getLectureses();
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
        console.log("enrollCourse",this.CourseList)
      }
    )
  }
  Test(){
  console.log("Here")
}
  removeEnrollCrs(crsid:any){
    console.log("Here")
    this.Enrollservices.getStdEnrollcrs(crsid).subscribe(
      data=>{
        this.Enrollservices.RemoveEnrollCourse(data.id).subscribe
        // console.log("Removed",crsid)
        (
          data=>{
              console.log("Removed",crsid)
          }
        )
        console.log("gg",data.id)      
      });
      // this.Enrollservices.RemoveEnrollCourse(crsid)

  }

//   getLecturesByID(id:number){
//     console.log("ID")
//     this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
//       this.lectureList=sucess,
//       console.log("kkk",this.lectureList)})
//   }
//   getLectureses(){
//     this.lectureServices.getAllLectures().subscribe(suces=>{
//    console.log("enter2")
//      this.lectureAllList=suces,
//      console.log(this.lectureAllList)},err=>{console.log(err)})
//  }
 

}
