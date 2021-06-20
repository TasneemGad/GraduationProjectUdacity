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
import { VideosService } from 'src/app/Services/videos.service';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { Question } from 'src/app/SharedModels/Interface/IQestions';
import { QuestionsService } from 'src/app/Services/questions.service';
import { StudentAnswerService } from 'src/app/Services/student-answer.service';
import { StudentAnswer } from 'src/app/SharedModels/Interface/StudentAnswer';


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
  SearchFlagLesson=false;
  currentCourseToSearch:any =""
  watchObj:IwatchContent={id:0,whatchedOrNot:0,crsID:0,stID:"",lessonContentID:0}
  currentLesson:Lesson ={title:" ",contentNumber:4,type:"h",lectureId:3,duration:125,details:"asd",crsId:0}
  allContentCurrentLesson:LessonContent[]=[];
  CurrentLesson:LessonContent
  progressObj:IProgress={id:0,courseId:0,numOfLesson:0,numOfLessonFinshed:0,studentId:""}
  QByLessonContent:Question[]
  trueAndFalseQuestion:Question[]
  dragAndDropQuestion:Question[]
  optionalQuestion:Question[]
  StudentAnswer:StudentAnswer[]
  CoursesVideos:CourseVideos
  progressId:number=0;
  LessonSearchList:Lesson[]=[]

@Input() CourseId:any

ngOnChanges():void{
  console.log("isChange?", this.CourseId)
  // this.currentCourseToSearch = this.courseSearch
  // console.log("search?", this.currentCourseToSearch)
}


  constructor(private active:ActivatedRoute,private router:Router, private lessonService:LessonService,
    private location:Location,private lectureServices:LecturesService,private courseServices:CoursesService,
    private lessonContentService:LessonContentService,private progress:ProgressService,private watch:WatchService,
    private token:AuthenticationService,private videoServices:VideosService,private QuestionsServices:QuestionsService,
    private  StudentASService:StudentAnswerService
    ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getLessonById(this.idUrl)
    this.getLessonContentById(this.idUrl);
    this.getCurrentCourse(this.idUrl);
    this.getVideosById(this.idUrl);

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

              this.currentCourseToSearch = data              
              console.log("sc",this.currentCourseToSearch)              
              return data.id
            })
        })
      })    
  }
  getLessonById(id:any){
    this.lessonService.GetLessonById(id).subscribe(sucess=>{this.currentLesson=sucess,console.log("currentLesson",this.currentLesson)})
  }
  getLessonContentById(id:number){
    this.lessonContentService.GetLessonContentByLesson(id).subscribe(sucess=>{
      this.allContentCurrentLesson=sucess,console.log("contentForLesson",this.allContentCurrentLesson)
      this.getLessonOneById(id)
      this.getVideosById(id);
      this.getQuestionsByLessonContent(id)
    })
  }
  getLessonOneById(id:number){
    this.lessonContentService.GetLessonContentById(id).subscribe(sucess=>{
      this.CurrentLesson=sucess,console.log("content-------",this.CurrentLesson)
    })
  }
  goToLessonData(id:any){
    this.getLessonOneById(id);
    this.getVideosById(id)
    this.getQuestionsByLessonContent(id)
    if(sessionStorage.getItem("CourseID")!=null)
    {
      this.CourseId=sessionStorage.getItem("CourseID")
      this.getProgress(this.CourseId,id)

    }
    this.router.navigate(['lessonData/',id],{relativeTo:this.active})
    


  }
  hideList(){
    this.Isdetails = !this.Isdetails
    this.text=this.Isdetails?"expand_more":"expand_less" 
     
  }
  goBack(){
    this.location.back();
  }
  controlSidenav(){
    this.IsOpened = !this.IsOpened
  }
  getVideosById(id:number){
    this.videoServices.getAllCourseViedosById(id).subscribe(sucess=>{
      this.CoursesVideos=sucess,console.log("currentvv",this.CoursesVideos)
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
  getProgress(crsId:any,lessonContentID:number){    
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
  getQuestionsByLessonContent(id:number){
    console.log("first")
    this.QuestionsServices.getQuestionsByLessonContent(id).subscribe(sucess=>{
      this.QByLessonContent=sucess,
      console.log("currentQGL",this.QByLessonContent)
      for(let question of sucess) {
        if(question.type == "t,f"){
          this.trueAndFalseQuestion?.push(question)
          console.log("t,f",question)
        } 
        else if(question.type == "options") {
          this.optionalQuestion?.push(question)
          console.log("options",question)
        } 
        else if(question.type == "Drag and Drop"){
          this.dragAndDropQuestion?.push(question)
          console.log("dragAndDrop",question)
        }
      }
      })
  }

  getStudentAnswerByLessonContent(id:number){
    console.log("first")
    this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(sucess=>{
      this.StudentAnswer=sucess,console.log("currentQGL",this.StudentAnswer)
  })
  }

  searchLesson(crsId:number,SearchLessonItem:string){  
    this.lessonService.GetAllLessonByCrsID(crsId).subscribe(
      lessonsdata=>{
        this.SearchFlagLesson=true;
        this.LessonSearchList=lessonsdata.filter(Lesson =>Lesson.title.toLocaleLowerCase().includes(SearchLessonItem) || Lesson.details.toLocaleLowerCase().includes(SearchLessonItem) )
      }
    )
    console.log("oooooooooooooooo",crsId,SearchLessonItem)
    console.log("oooooooooooooooo",this.LessonSearchList)

  }
}
