import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { LecturesComponent } from '../lectures/lectures.component';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit{
  LessonByLectureID: Lesson[]=[];
  idUrl:any
  nextid:any
  clickedLecture:Lectures = {id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:"kk"}
  NextLecture:Lectures={id:1,courseId:3,lectureDescription:"",lessoneNumber:3,tilte:"mm"}
  getNextOfClickedLecture:Lectures
  nameOfNextLecture:string

  constructor(private lessonService:LessonService,private router:Router,private active:ActivatedRoute,
  private lectureServices:LecturesService) { }

    
// @ViewChild(LecturesComponent) data : LecturesComponent


  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getLessonByLectureID(this.idUrl);
    this.GetLectureByID(this.idUrl)
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

GetLectureByID(LecId:number){
  console.log("ID")
  this.lectureServices.getLecturesByID(LecId).subscribe(sucess=>{
    this.clickedLecture=sucess,
    console.log("LLLLL",this.clickedLecture?.tilte)
  })

}

// getNextLecture(){
//   console.log("in")
//   this.lectureServices.getLecturesByID(this.getNextLectureId).subscribe(sucess=>{
//     this.getNextOfClickedLecture=sucess,
//     this.nameOfNextLecture = this.getNextOfClickedLecture?.tilte
//     console.log("LLnextLLL",this.nameOfNextLecture)

//   })
// }
goToLessonContent(id:any){
  console.log("content",id)
  this.router.navigate(["lessonContent/",id])
}

}


