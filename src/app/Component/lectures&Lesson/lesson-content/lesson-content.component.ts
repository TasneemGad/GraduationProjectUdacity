import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LessonService } from 'src/app/Services/lesson.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { Location } from '@angular/common';
import { LecturesService } from 'src/app/Services/lectures.service';
import { CoursesService } from 'src/app/Services/courses.service';


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
  currentCourseToSearch:any =""

  currentLesson:Lesson ={title:" ",contentNumber:4,type:"h",lectureId:3,duration:125,details:"asd"}
  allContentCurrentLesson:LessonContent[]=[];
  CurrentLesson:LessonContent

// @Input() courseSearch:any

// ngOnChanges():void{
//   console.log("isChange?", this.courseSearch)
//   // this.currentCourseToSearch = this.courseSearch
//   // console.log("search?", this.currentCourseToSearch)
// }


  constructor(private active:ActivatedRoute,private router:Router, private lessonService:LessonService,
    private location:Location,private lectureServices:LecturesService,private courseServices:CoursesService,
    private lessonContentService:LessonContentService
    ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getLessonById(this.idUrl)
    this.getLessonContentById(this.idUrl);
    this.getCurrentCourse(this.idUrl)
    console.log("iidd",this.idUrl)
  })

  }
  getLessonById(id:any){
    this.lessonService.GetLessonById(id).subscribe(sucess=>{this.currentLesson=sucess,console.log("currentLesson",this.currentLesson)})
  }
  hideList(){
    this.Isdetails = !this.Isdetails
    this.text=this.Isdetails?"expand_more":"expand_less" 
     
  }

  getLessonContentById(id:number){
    this.lessonContentService.GetLessonContentByLesson(id).subscribe(sucess=>{
      this.allContentCurrentLesson=sucess,console.log("content",this.allContentCurrentLesson)
      this.getLessonOneById(id)
      // this.controlSidenav()
    })
  }
  getLessonOneById(id:number){
    this.lessonContentService.GetLessonContentById(id).subscribe(sucess=>{
      this.CurrentLesson=sucess,console.log("content",this.CurrentLesson)
    })
  }

  goBack(){
    
    this.location.back();
  }
  goToLessonData(id:any){
    this.getLessonOneById(id);
    this.router.navigate(['lessonData/',id],{relativeTo:this.active})
  }
  controlSidenav(){
    this.IsOpened = !this.IsOpened
  }

  getCurrentCourse(id:any){
    console.log("enterLesson1",id)
    this.lessonService.GetLessonById(id).subscribe(sucess=>
      { console.log("enterLesson",sucess?.lectureId)
        this.lectureServices.getLecturesByID(sucess?.lectureId).subscribe(sucess=>
      { console.log("enterLesson",sucess?.courseId)
          this.courseServices.getCoursesByID(sucess.courseId).subscribe(
            data => {
              this.currentCourseToSearch = data.name              
              console.log("sc",this.currentCourseToSearch)
            })
        })
      })
  }
}
