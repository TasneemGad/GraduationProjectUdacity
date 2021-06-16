import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  LessonByLectureID: Lesson[]=[];
  idUrl:any
  // NextLecture:Lectures
  // clickedLecture:Lectures
  clickedLecture:Lectures = {id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:""}
  NextLecture:Lectures = {id:1,courseId:3,lectureDescription:"k",lessoneNumber:3,tilte:"j"}
  constructor(private lessonService:LessonService,private router:Router,private active:ActivatedRoute,
    private lectureServices:LecturesService) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    // console.log("lessonID",this.idUrl)
    this.getLessonByLectureID(this.idUrl);
    // console.log("enter",this.NextLecture)
    // this.GetLectureByID(this.idUrl)
  })

  }
getLessonByLectureID(id:number){
         console.log("Lecidgggggggggggggggg",id)
    this.lessonService.GetAllLessonByLectureId(id).subscribe(sucess=>
      {
      this.LessonByLectureID=sucess;     
        {console.log("lessonLectures",this.LessonByLectureID)
      }
    })
  
    }
getNextLectures(id:any){
  console.log("ID",id)
  this.lectureServices.getLecturesByID(id+1).subscribe(sucess=>{
    this.NextLecture=sucess,
    console.log("Ljnkjnb",this.NextLecture)})
}
GetLectureByID(LecId:number){
  console.log("ID")
  // this.indexLecture = index
  this.lectureServices.getLecturesByID(LecId).subscribe(sucess=>{
    this.clickedLecture=sucess,
 
    console.log("LLLLL",this.clickedLecture.tilte)
  })
  // this.getNextLectures(LecId)
}
goToLessonContent(id:any){
  console.log("content",id)
  this.router.navigate(["lessonContent/",id])
}
}
