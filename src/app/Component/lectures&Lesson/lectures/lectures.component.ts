import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  allLesson:Lesson[] =[]

  lectureList:Lectures[]=[]
  lectureAllList:Lectures[]=[]
  courseList:ICourse
  change:any
  Isdetails:boolean=true
  indexLecture:number
  NextLecture:Lectures={id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:"mm"}
  
  LessonByLectureID: Lesson[];
  clickedLecture: Lectures;
  // NextLecture: any;
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute,
    private courseServices:CoursesService,private router:Router, 
    private lessonService:LessonService) { }
  idUrl:any
  color="white"
  getID:number
  text="expand_less"
  flag = 0
  flag32 = "HI"
//next  
  nextLectureId:number
  getNextOfClickedLecture:Lectures
  nameOfNextLecture:string
  nextIndex:number
  showNext = false

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByCourseID(this.idUrl);
    this.getLectureses();
    this.getCourseById(this.idUrl);
    console.log("Lecid",this.idUrl)
    this.getAllLesson();
  //  this.print()
  }
  print(){
    console.log("iiiiii")
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
GetLectureByID(LecId:number,index:any){
        this.indexLecture = index
      this.lectureServices.getLecturesByID(LecId).subscribe(sucess=>{
  
      this.clickedLecture=sucess,
    console.log("L",this.clickedLecture.tilte)
  })
  // this.getLessonByLectureID(LecId,index:any);
  console.log("Iddddddddddd",LecId)  
    this.goToSpasificLecture(LecId)
    this.getNextLectures(LecId)
    
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
goto(id:any,text:any){
  this.showNextLectire(text)
 var x=  this.router.navigate(["coreCurriculum/",id],{relativeTo:this.active})
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

  showProgram(id:any,text:string){
    this.flag = 0
    var x=  this.router.navigate(["ProgramHome/",id],{relativeTo:this.active})
    this.showNextLectire(text)
  }
  showSyllabus(){
    this.flag = 1
  }
  showLecture(id:any){
    this.flag = 2
    var x=  this.router.navigate(["Lesson/",id],{relativeTo:this.active})
  }
  getLessonByLectureID(id:any,index:any,text:any){
    this.nextIndex=index
    console.log("Lecidgggggggggggggggg",id)
  this.lessonService.GetAllLessonByLectureId(id).subscribe(sucess=>{
  this.LessonByLectureID=sucess,
    console.log("lessonLectures",this.LessonByLectureID)
    })
  this.showLecture(id)
      this.nextLectureId = this.lectureList[index].id
      this.getNextLecture()
      this.showNextLectire(text)
  }
  goToNext(id:any){
    console.log("ID2ii",id)
    this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
      this.NextLecture=sucess,
      console.log("tasneem",this.NextLecture.tilte)})
  }
  //next
  getNextLecture(){
    console.log("in")
    this.lectureServices.getLecturesByID(this.nextLectureId).subscribe(sucess=>{
      this.getNextOfClickedLecture=sucess,
      this.nameOfNextLecture = this.getNextOfClickedLecture?.tilte
      console.log("LLnextLLL",this.nameOfNextLecture)

    })
  }
  showNextLectire(text:string){
    if(text == "proAndCore")
    {
      this.showNext = false
    }
    else
    {
      this.showNext = true
    }

  }
 
}
