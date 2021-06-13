import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
=======
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';
>>>>>>> 5a4b1e6d9b91acfbd575a7c0fd62b290df0d0758
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  lectureList:Lectures[]
  lectureAllList:Lectures[]
<<<<<<< HEAD
  courseList:ICourse
  change:any
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private courseServices:CoursesService,private router:Router) { }
  idUrl:any
 color="white"
 getID:number
  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByID(this.idUrl);
    this.getLectureses();
    this.getCourseById(this.idUrl);
=======
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private Enrollservices:EnrollService,private courseServices:CoursesService) { }
    
    CourseList:ICourse[]=[];

    // idUrl:any
  ngOnInit(): void {

    this.AllStdCourses();
    
    // this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    // this.getLecturesByID(this.idUrl);
    // this.getLectureses();
>>>>>>> 5a4b1e6d9b91acfbd575a7c0fd62b290df0d0758
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
<<<<<<< HEAD
  getLectureses(){
    this.lectureServices.getAllLectures().subscribe(suces=>{
   console.log("enter2")
     this.lectureAllList=suces,
     console.log(this.lectureAllList)},err=>{console.log(err)})
 }
 getCourseById(id:number){
  this.courseServices.getCoursesByID(id).subscribe(sucess=>{console.log(this.courseList=sucess)})
}
=======

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
 
>>>>>>> 5a4b1e6d9b91acfbd575a7c0fd62b290df0d0758

}
