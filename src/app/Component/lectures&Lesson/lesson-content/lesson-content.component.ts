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
import { AccountService } from 'src/app/Services/account.service';
import { QOptions } from 'src/app/SharedModels/Interface/QuestionOtions';
import { QuestionOptionsService } from 'src/app/Services/question-options.service';


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
  allQuestion:Question
  StudentAnswerByLesson:StudentAnswer[]
  StudentAnswer:StudentAnswer
  QOptionsList:QOptions
  CoursesVideos:CourseVideos
  correctAn:any
  currentStudent:string
  
  trueAndFalseQuestion:Question[]
  dragAndDropQuestion:Question[]
  optionalQuestion:Question[]
  mayBeAnswer:any
  lastAnswerOfTrueAndFalse:string
  AnswerOfTrueAndFalse:StudentAnswer

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
  private  StudentASService:StudentAnswerService,private accountService:AccountService   ,
  private OptionServices:QuestionOptionsService
  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    console.log("iiiiiiiiiid",this.idUrl)
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
      this.getAllQuestions(id);
      this.getOptions(id)
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
    this.getAllQuestions(id);
    this.getOptions(id)
    if(sessionStorage.getItem("CourseID")!=null)
    {
      this.CourseId=sessionStorage.getItem("CourseID")
      this.getProgress(this.CourseId,id)
    }
    this.router.navigate(['lessonData/',id],{relativeTo:this.active})
    this.getStudentAnswer(id)
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
//   getStudentAnswerByLessonContent(id:number){
//     console.log("first")
//     this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(sucess=>{
//       this.StudentAnswer=sucess,console.log("currentQGL",this.StudentAnswer)
//   })
// }
 getStudentAnswerByLessonContent(id:number){
  console.log("first")
  this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(sucess=>{
    // this.StudentAnswer=sucess,console.log("currentQGL",this.StudentAnswer)
})
}
// getAllQuestions(){
//   console.log("first")
//   this.QuestionsServices.getAllQuestions().subscribe(sucess=>{
//     this.allQuestion=sucess,console.log("currentQGL",this.allQuestion)
// })
// }
getAllQuestions(id:number){
  console.log("first")
  this.QuestionsServices.getQuestionsById(id).subscribe(sucess=>{
    this.allQuestion=sucess,console.log("currentQGL",this.allQuestion)
})
}
SubmitAnswer(id:number){
  this.getStudentAnswer(id)
  // this.postStudentAnswer()
}
getStudentAnswer(id:any){
this.accountService.getStudentInformation(this.token.getUserId()).subscribe(
  data=>
  {    
  console.log("enter1") 
  // data.id=id
  console.log("id",id,data)

  this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(
    sucess=>
    {console.log("cc",id,this.StudentAnswerByLesson=sucess,this.StudentAnswerByLesson)})  
  })
  
}
postStudentAnswer(user:StudentAnswer){
  this.accountService.getStudentInformation(this.token.getUserId()).subscribe(
    data=>
    {    
    console.log("enter1") 
    // data.id=id
    console.log("id",user,data)
  
    this.StudentASService.PostStudentAnswer(user).subscribe(
      sucess=>
      {
        console.log("cc",this.StudentAnswerByLesson=sucess,this.StudentAnswerByLesson)
      })  
    })

<<<<<<< HEAD
  }
  getOptions(id:number){
    
      this.OptionServices.getQuestionsOptionByQuestionId(id).subscribe(
        sucess=>
        {
          this.QOptionsList=sucess
          console.log("ccoop",this.QOptionsList)
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
=======
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
>>>>>>> 15332c870a34b9011799ce8eec948897d5a8bcf9

}
answerMayOfTrueAndFalse(answer:any){
  console.log("ans",answer)
  this.mayBeAnswer = answer
}
finalAnswerOfTrueAndFalse(id:number,idContent:any){
  this.lastAnswerOfTrueAndFalse = this.mayBeAnswer
  console.log("lastAns",this.lastAnswerOfTrueAndFalse)
  this.accountService.getStudentInformation(this.token.getUserId()).subscribe(data=>{
    this.currentStudent = data.id
  })
  this.AnswerOfTrueAndFalse = {questionId: id,lessonContentId: idContent ,studentId: this.currentStudent ,studentanswer:this.lastAnswerOfTrueAndFalse}
  console.log("testannnnnnnnnnnnnnn",this.AnswerOfTrueAndFalse)
  this.StudentASService.PostStudentAnswer(this.AnswerOfTrueAndFalse).subscribe(data=>{
    console.log("testand",data)
  })
}
}
