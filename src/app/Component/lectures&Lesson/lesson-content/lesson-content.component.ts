import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LessonService } from 'src/app/Services/lesson.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent implements OnInit {
  Isdetails:boolean=true
  text="expand_less"
  idUrl:any
  IsOpened = true

  currentLesson:Lesson ={title:" ",contentNumber:4,type:"h",lectureId:3,duration:125,details:"asd"}
  allContentCurrentLesson:LessonContent[]=[];
  constructor(private active:ActivatedRoute,private router:Router, private lessonService:LessonService,
    // private lessonContentService:LessonContentService
    ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getLessonById(this.idUrl)
  })

  }
  getLessonById(id:any){
    this.lessonService.GetLessonById(id).subscribe(sucess=>{this.currentLesson=sucess,console.log("currentLesson",this.currentLesson)})
  }
  hideList(){
    this.Isdetails = !this.Isdetails
    this.text=this.Isdetails?"expand_more":"expand_less" 
     
  }
  controlSidenav(){
    this.IsOpened = !this.IsOpened
  }
  // getLessonContentById(id){
  //   this.lessonContentService.(id).subscribe(sucess=>{this.allContentCurrentLesson=sucess,console.log(this.allContentCurrentLesson)})
  // }

}
