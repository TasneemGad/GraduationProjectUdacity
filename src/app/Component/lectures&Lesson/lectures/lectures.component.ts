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

  lectureList:Lectures[]=[]
  lectureAllList:Lectures[]=[]
  courseList:ICourse
  change:any
  Isdetails:boolean=true
  indexLecture:number
  
  LessonByLectureID: Lesson[];
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private courseServices:CoursesService,private router:Router, private lessonService:LessonService) { }
  idUrl:any
  color="white"
  getID:number
  text="expand_less"
  flag = 0

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByCourseID(this.idUrl);
    this.getLectureses();
    this.getCourseById(this.idUrl);
    console.log("Lecid",this.idUrl)
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
<<<<<<< HEAD
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
goto(id:number){
 var x=  this.router.navigate(["coreCurriculum",id],{relativeTo:this.active})
=======


// goToSpasificLecture(id:any){
//   this.router.navigate(["SpasificLecture",id],{relativeTo:this.active})
// }
goto(id:any){
 var x=  this.router.navigate(["coreCurriculum/",id],{relativeTo:this.active})
>>>>>>> 545882aaace2a7077418e2e64151ba5c6b7f1bfe
  console.log("c",x)
}
    // for (let i of this.lectureAllList) {
    //   if(i.id==id){
    //     //  console.log(this.getID)
    //     // this.color="green"
    //   }
    // }
    // this.getID=id
    // console.log(this.getID)

  showProgram(id:any){
    this.flag = 0
    var x=  this.router.navigate(["ProgramHome/",id],{relativeTo:this.active})

  }
  showSyllabus(){
    this.flag = 1
  }
  showLecture(id:any){
    this.flag = 2
    var x=  this.router.navigate(["Lesson/",id],{relativeTo:this.active})
  }

  getLessonByLectureID(id:number){
    console.log("Lecidgggggggggggggggg",id)
this.lessonService.GetAllLessonByLectureId(id).subscribe(sucess=>
 {
 this.LessonByLectureID=sucess;     
   {console.log("lessonLectures",this.LessonByLectureID)
 }

})
this.showLecture(id)
}
}
