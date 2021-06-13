import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lessons } from 'src/app/SharedModels/Interface/ILessons';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
allLesson:Lessons[]
LessonList:Lessons[]
lectureList:Lectures[]
idUrl:any
  constructor(private lessonService:LessonService,private router:Router,private active:ActivatedRoute,private lectureServices:LecturesService) { }

  ngOnInit(): void {
    this.LessonList
       this.active.paramMap.subscribe((params:ParamMap)=>{this.idUrl =params.get('id')
      console.log("idLesson", this.idUrl)
    })
this.getAllLesson();
this.getLessonByID(this.idUrl);
this.getLecturesByID(this.idUrl);
  }
getAllLesson(){
  this.lessonService.getAllLessons().subscribe(sucess=>{this.allLesson=sucess,console.log(this.allLesson)})
}
getLessonByID(id:number){
this.lessonService.getLessonsById(id).subscribe(sucess=>{this.LessonList=sucess,console.log(this.LessonList)})
}
getLecturesByID(id:number){
  console.log("ID")
  this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
    this.lectureList=sucess,
    console.log("kkk",this.lectureList)})
}
}
