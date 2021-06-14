import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  allLesson:Lesson[] 

  lectureList:Lectures[]
  lectureAllList:Lectures[]
  courseList:ICourse
  change:any
  Isdetails:boolean=true
  clickedLecture:Lectures = {id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:""}
  NextLecture:Lectures = {id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:""}
  indexLecture:number
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private courseServices:CoursesService,private router:Router, private lessonService:LessonService) { }
  idUrl:any
 color="white"
 getID:number
 text="expand_less"
  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByCourseID(this.idUrl);
    this.getLectureses();
    this.getCourseById(this.idUrl);
    console.log("id",this.idUrl)
    this.getAllLesson();
    
  }

  getAllLesson(){
    this.lessonService.GetAllLesson().subscribe(sucess=>{this.allLesson=sucess,console.log(this.allLesson)})
  }

  category(){
this.router.navigate(['Courses'],{relativeTo:this.active})

  }
  getLecturesByCourseID(id:number){
    console.log("ID")
    this.lectureServices.getLecturesByCoursID(id).subscribe(sucess=>{
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
done(id:any){
  this.router.navigate(['Lesson'],{relativeTo:this.active})

  // for (let i of this.lectureAllList) {
  //   if(i.id==id){
  //     //  console.log(this.getID)
  //     // this.color="green"
  //   }
  // }
  // this.getID=id
  // console.log(this.getID)
}
hideList(){
  this.Isdetails = !this.Isdetails
  this.text=this.Isdetails?"expand_more":"expand_less" 
   
}
getLecturesByID(id:any,index:any){
  console.log("ID")
  this.indexLecture = index
  this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
    this.clickedLecture=sucess,
    console.log("L",this.clickedLecture.tilte)})
    this.goToSpasificLecture(id)
    this.getNextLectures(id)
}
getNextLectures(id:any){
  console.log("ID")
  this.lectureServices.getLecturesByID(id+1).subscribe(sucess=>{
    this.NextLecture=sucess,
    console.log("L",this.NextLecture.tilte)})
}
goToSpasificLecture(id:any){
  this.router.navigate(["SpasificLecture",id],{relativeTo:this.active})
}
goto(){
 var x=  this.router.navigate(["coreCurriculum"],{relativeTo:this.active})
  console.log("c",x)
}
}
