import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  lectureList:Lectures[]
  lectureAllList:Lectures[]
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
  }
  getLecturesByID(id:number){
    console.log("ID")
    this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
      this.lectureList=sucess,
      console.log("kkk",this.lectureList)})
  }
  getLectureses(){
    this.lectureServices.getAllLectures().subscribe(suces=>{
   console.log("enter2")
     this.lectureAllList=suces,
     console.log(this.lectureAllList)},err=>{console.log(err)})
 }
 getCourseById(id:number){
  this.courseServices.getCoursesByID(id).subscribe(sucess=>{console.log(this.courseList=sucess)})
}

}
