import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LessonService } from 'src/app/Services/lesson.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { Location } from '@angular/common';
import { LecturesService } from 'src/app/Services/lectures.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ProgressService } from 'src/app/Services/progress.service';
import { WatchService } from 'src/app/Services/watch.service';
import { IwatchContent } from 'src/app/SharedModels/Interface/iwatchcontent';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IProgress } from 'src/app/SharedModels/Interface/iprogress';


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
  checkExist:boolean=false;
  currentCourseToSearch:any =""
  watchObj:IwatchContent={id:0,whatchedOrNot:0,crsID:0,stID:"",lessonContentID:0}
  currentLesson:Lesson ={title:" ",contentNumber:4,type:"h",lectureId:3,duration:125,details:"asd"}
  allContentCurrentLesson:LessonContent[]=[];
  CurrentLesson:LessonContent
  progressObj:IProgress={id:0,courseId:0,numOfLesson:0,numOfLessonFinshed:0,studentId:""}
  

@Input() CourseId:any

ngOnChanges():void{
  console.log("isChange?", this.CourseId)
  // this.currentCourseToSearch = this.courseSearch
  // console.log("search?", this.currentCourseToSearch)
}


  constructor(private active:ActivatedRoute,private router:Router, private lessonService:LessonService,
    private location:Location,private lectureServices:LecturesService,private courseServices:CoursesService,
    private lessonContentService:LessonContentService,private progress:ProgressService,private watch:WatchService,
    private token:AuthenticationService
    ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getLessonById(this.idUrl)
    this.getLessonContentById(this.idUrl);
    this.getCurrentCourse(this.idUrl)

  })

  }
  getCurrentCourse(id:number):any{
    console.log("enterLesson1",id)
    this.lessonService.GetLessonById(id).subscribe(sucess=>
      { console.log("enterLesson",sucess?.lectureId)
        this.lectureServices.getLecturesByID(sucess?.lectureId).subscribe(sucess=>
      { console.log("enterLesson",sucess?.courseId)
          this.courseServices.getCoursesByID(sucess.courseId).subscribe(
            data => {

              this.currentCourseToSearch = data.id              
              console.log("sc",this.currentCourseToSearch)              
              return data.id
            })
        })
      })    
  }
  insertWatch(lessonContentID:number,crsId:number){
    this.watchObj.whatchedOrNot=1;
    this.watchObj.stID=this.token.getUserId();
    this.watchObj.crsID=crsId
    this.watchObj.lessonContentID=lessonContentID
    console.log("this.watchObj",this.watchObj)
    this.watch.insertWatch(this.watchObj).subscribe(
      data=>{
          console.log("Add")
      }
    )

  }
  getProgress(crsId:number,lessonContentID:number){    
    this.progress.getLessonContentProgress(crsId).subscribe(
      data=>{      
        console.log(data);  
        this.watch.getWatch(crsId,lessonContentID).subscribe(
          watchObj=>{
            this.checkExist=watchObj
            console.log("watchObj---Here",watchObj)
            console.log("Checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",this.checkExist)
            if(this.checkExist==false){
              data.numOfLessonFinshed++;
              this.insertWatch(lessonContentID,crsId)            
              this.progress.UpdateLessonContentProgress(data,data.id).subscribe(
                progressUpdateObj=>{
                  console.log("updated")
                }
              )
            }            
          }
        )
        console.log("lessonID",this.idUrl)
     
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
      this.CurrentLesson=sucess,console.log("content-------",this.CurrentLesson)
    })
  }

  goBack(){
    
    this.location.back();
  }
  goToLessonData(id:any){
    this.getLessonOneById(id);
    if(sessionStorage.getItem("CourseID")!=null)
    {
      this.CourseId=sessionStorage.getItem("CourseID")
      this.getProgress(this.CourseId,id)

    }
    this.router.navigate(['lessonData/',id],{relativeTo:this.active})
    


  }
  controlSidenav(){
    this.IsOpened = !this.IsOpened
  }

 
}
