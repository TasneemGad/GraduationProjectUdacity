import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
<<<<<<< HEAD
import { identity } from 'rxjs';
=======
import { LessonDataComponent } from '../lesson-data/lesson-data.component';
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee


@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent implements OnInit ,AfterViewInit{
  Isdetails:boolean=true
  text="expand_less"
  idUrl:any
  IsOpened = true
  checkExist:boolean=false;
  SearchFlagLesson=false;
  currentCourseToSearch:any =""
  watchObj:IwatchContent={id:0,whatchedOrNot:0,crsID:0,stID:"",lessonContentID:0}
  currentLesson:Lesson ={title:" ",contentNumber:4,type:"h",lectureId:3,duration:125,details:"asd",crsId:0}
  allContentCurrentLesson:LessonContent[];
  CurrentLesson:LessonContent
<<<<<<< HEAD
  // progressObj:IProgress={id:0,courseId:0,numOfLesson:0,numOfLessonFinshed:0,studentId:""}
  CoursesVideos:CourseVideos
  idLessonContent:number
  id:any
  // LessonSearchList:Lesson[]=[]

//Question:  
  QOptionsList:QOptions[]=[]
  QByLessonContent:Question[]=[]
  allQuestion:Question
  StudentAnswerByLesson:StudentAnswer[]
  StudentAnswer:StudentAnswer
  questionAnswered:StudentAnswer[]
=======
  allLessonContent:LessonContent={id:1,lectureId:1,videoLinkId:1,description:"",questionGroupId:1,lessonId:1,title:"",type:"",header:""}
  progressObj:IProgress={id:0,courseId:0,numOfLesson:0,numOfLessonFinshed:0,studentId:""}
  QByLessonContent:Question[]
  allQuestion:Question
  StudentAnswerByLesson:StudentAnswer[]
  StudentAnswer:StudentAnswer
  QOptionsList:QOptions[]
  CoursesVideos:CourseVideos
  correctAn:any
  currentStudent:string
apiUrl="https://localhost:44326";
  x:boolean
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee
  isAnswered:string="true"
  notAnswered : any="false"
  trueAndFalseQuestion:Question[]
  dragAndDropQuestion:Question[]
  optionalQuestion:Question[]
  mayBeAnswerTrueAndFalseQuestion:any
  lastAnswerOfTrueAndFalse:string
  AnswerOfTrueAndFalse:StudentAnswer
  questionTrueAndFalseNotAnswered:Question[]=[]
  flag:any=false

<<<<<<< HEAD
  mayBeAnswerOptionQuestion:string
  AnswerOfOptions:StudentAnswer
  lastAnswerOptionQuestion:string
  isAnswerwdOPtion:boolean = false
  notAnsweredYetForOptional:Question[]
  g:QOptions[]=[]
  j:StudentAnswer[]
=======
ngOnChanges():void{
  console.log("isChange?", this.CourseId)
  // this.currentCourseToSearch = this.courseSearch
  // console.log("search?", this.currentCourseToSearch)
}
@ViewChild(LessonDataComponent) c:LessonDataComponent
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee

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
  ngAfterViewInit(): void {
    
    console.log("hhhh",)
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.QOptionsList={opt1:"",opt2:"",opt3:"",opt4:"",right:"",qustionId:1,id:1}
<<<<<<< HEAD
    // this.getNotAnsweredOFTrueAndFalse()
=======
  const us=this.allLessonContent.lessonId
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    console.log("iiiiiiiiiid",this.idUrl)
    this.getLessonById(this.idUrl)
    this.getCurrentCourse(this.idUrl);
<<<<<<< HEAD
    this.getVideosById(this.idUrl);
=======
    this.getLessonContentById(this.idUrl);
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee
  })
  // this.getLessonContentById(us);

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
      // this.getVideosById(id);
    //  console.log("currentvideohhhhhhhhh",id,this.allContentCurrentLesson ,this.getVideosById(id))

      this.getQuestionsByLessonContent(id)
      this.getAllQuestions(id);
      // this.getOptions(id)
    })
  }
  getLessonOneById(id:number){
    this.lessonContentService.GetLessonContentById(id).subscribe(sucess=>{
      this.CurrentLesson=sucess,console.log("content-------",this.CurrentLesson)
      // this.getVideosById(id)

    })
  }
  goToLessonData(id:any){
    console.log("AID",identity)
    this.getLessonOneById(id);
    this.getVideosById(id);
    console.log("currentvideo",id,)
    this.getQuestionsByLessonContent(id)
    this.getAllQuestions(id);
    // this.getOptions(id)
    if(sessionStorage.getItem("CourseID")!=null)
    {
      this.CourseId=sessionStorage.getItem("CourseID")
      this.getProgress(this.CourseId,id)
    }
<<<<<<< HEAD
=======
    // this.router.navigate(['lessonData/',id],{relativeTo:this.active})
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee
    this.getStudentAnswer(id)
    this.idLessonContent = id
  }
  getVideosById(id:number){
    this.videoServices.getAllCourseViedosById(id).subscribe(sucess=>{
       this.CoursesVideos=sucess,console.log("currentvvff",this.CoursesVideos,this.CoursesVideos.videoURL ,id)
    
    })
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
  public createImgPath = (serverPath: string) => {
    console.log(`${this.apiUrl}/${serverPath}`)
     return `${this.apiUrl}/${serverPath}`;
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
              this.progress.UpdateLessonContentProgress(data,data?.id).subscribe(
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


//Questions  
  getQuestionsByLessonContent(id:number){
    // this.getOptions(id)
    console.log("first")
    this.QuestionsServices.getQuestionsByLessonContent(id).subscribe(sucess=>{
      this.QByLessonContent=sucess;
      for(let Q of sucess)
      {console.log("QQQQ",Q.id)
        this.getOptions(Q.id)
      };
      console.log("currentQGL",this.QByLessonContent)
      for(let question of sucess) {
        if(question.type == "t,f"){
          this.trueAndFalseQuestion?.push(question)
          console.log("t,f",question.title)
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
    this.getNotAnsweredOFTrueAndFalse();
    
  }
  getStudentAnswerByLessonContent(id:number){
  console.log("first")
  this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(sucess=>{
    // this.StudentAnswer=sucess,console.log("currentQGL",this.StudentAnswer)
  })
  }
  getAllQuestions(id:number){
  console.log("first")
  this.QuestionsServices.getQuestionsById(id).subscribe(sucess=>{
    this.allQuestion=sucess,console.log("currentQGL",this.allQuestion)
  })
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


//Options Question  
  getOptions(id:any){
    this.QOptionsList = []
    this.OptionServices.getQuestionsOptionByQuestionId(id).subscribe(
      sucess=>
      {    
        for(let option of sucess)
        {
          this.QOptionsList.push(option)
          console.log("ccoop",this.QOptionsList,this.QOptionsList)
        }
      })
      this.checkIAnsweredOFOptionQuestion()
  }
  check(value:string){
    // this.QOptionsList=value
    this.mayBeAnswerOptionQuestion =value
  }
  postAnswer(idQuestion:number,idContent:number){
    this.lastAnswerOptionQuestion = this.mayBeAnswerOptionQuestion
    this.OptionServices.getQuestionsOptionByQuestionId(idQuestion).subscribe(data=>{
    for(let i of data)
    {
      if(i.right == this.lastAnswerOptionQuestion)
      {
        this.AnswerOfOptions = {questionId: idQuestion,lessonContentId: idContent ,studentId: this.token.getUserId(),studentanswer:this.mayBeAnswerOptionQuestion}
        console.log("testannAnswerOfOptions",this.AnswerOfOptions)
        this.StudentASService.PostStudentAnswer(this.AnswerOfOptions).subscribe(data=>{
        console.log("testand",data)
        })
      }
      else
      {
        alert("IN COURRECT ANSWER!!")
      }
    }
  })
  }
  checkIAnsweredOFOptionQuestion(){
    this.g = this.QOptionsList
    this.j = this.StudentAnswerByLesson
    console.log("JJJJJJJJJJJJJJJJJJJJ")
    // QByLessonContent
    for(let question of this.QByLessonContent)
    {
      console.log("JJJJJJJJJJJJJJJJJJJJ")
      for(let ans of this.StudentAnswerByLesson)
      {
        if(question.id == ans.questionId)
        {
          this.isAnswerwdOPtion =true
          console.log("hjkl")
        }       
        localStorage.setItem("ISANSWER",`${this.isAnswerwdOPtion}`)
      }
      console.log("notAnsweredOPtion",localStorage.getItem("ISANSWER")) 
      var d = localStorage.getItem("ISANSWER")
      console.log("dddddddddddd",d)
      if((!d) == true)
      {
        console.log("int")
        this.notAnsweredYetForOptional.push(question)
        console.log("notAnsweredOPtionf",this.notAnsweredYetForOptional)
      }
      this.isAnswerwdOPtion = false
    }
  }


//True and False Question  
  answerMayOfTrueAndFalse(answer:any){
  console.log("ans",answer)
  this.mayBeAnswerTrueAndFalseQuestion = answer
  }
  finalAnswerOfTrueAndFalse(id:number,idContent:any){
  this.lastAnswerOfTrueAndFalse = this.mayBeAnswerTrueAndFalseQuestion
  console.log("lastAns",this.lastAnswerOfTrueAndFalse)
  
  this.OptionServices.getQuestionsOptionByQuestionId(id).subscribe(data=>{
    for(let i of data)
    {
      if(i.right == this.lastAnswerOptionQuestion)
      {
        this.AnswerOfTrueAndFalse = {questionId: id,lessonContentId: idContent ,studentId: this.token.getUserId(),studentanswer:this.lastAnswerOfTrueAndFalse}
        console.log("testann",this.AnswerOfTrueAndFalse)
        this.StudentASService.PostStudentAnswer(this.AnswerOfTrueAndFalse).subscribe(data=>{
        console.log("testand",data)
        })
      }
      else
      {
        alert("IN COURRECT ANSWER!!")
      }
    }
  })
  }
  getNotAnsweredOFTrueAndFalse(){
    this.questionTrueAndFalseNotAnswered=[]
    for(let ques of this.QByLessonContent)
    {
      for(let ans of this.questionAnswered)
      {
        if(ans.questionId == ques.id)
        {
          this.flag = true
          continue
        }
        else
        {
          this.flag = false
        }
      }
      if(!this.flag)
      {
        this.questionTrueAndFalseNotAnswered.push(ques)
      }
    }
    console.log("fllaag",this.questionTrueAndFalseNotAnswered)
  }

  //   searchLesson(crsId:number,SearchLessonItem:string){  
//     this.lessonService.GetAllLessonByCrsID(crsId).subscribe(
//       lessonsdata=>{
//         this.SearchFlagLesson=true;
//         this.LessonSearchList=lessonsdata.filter(Lesson =>Lesson.title.toLocaleLowerCase().includes(SearchLessonItem) || Lesson.details.toLocaleLowerCase().includes(SearchLessonItem) )
//       }
//     )
//     console.log("oooooooooooooooo",crsId,SearchLessonItem)
//     console.log("oooooooooooooooo",this.LessonSearchList)
// }
// searchLesson(crsId:number,SearchLessonItem:string){  
//   this.lessonService.GetAllLessonByCrsID(crsId).subscribe(
//     lessonsdata=>{
//       this.SearchFlagLesson=true;
//       this.LessonSearchList=lessonsdata.filter(Lesson =>Lesson.title.toLocaleLowerCase().includes(SearchLessonItem) || Lesson.details.toLocaleLowerCase().includes(SearchLessonItem) )
//     }
//   )
//   console.log("oooooooooooooooo",crsId,SearchLessonItem)
//   console.log("oooooooooooooooo",this.LessonSearchList)

// }
<<<<<<< HEAD

}
=======
answerMayOfTrueAndFalse(answer:any){
  console.log("ans",answer)
  this.mayBeAnswer = answer
}
finalAnswerOfTrueAndFalse(id:number,idContent:any){
  this.lastAnswerOfTrueAndFalse = this.mayBeAnswer
  console.log("lastAns",this.lastAnswerOfTrueAndFalse)
  // this.accountService.getStudentInformation(this.token.getUserId()).subscribe(data=>{
  //   this.currentStudent = data.id
  // })
  this.AnswerOfTrueAndFalse = {questionId: id,lessonContentId: idContent ,studentId: this.token.getUserId(),studentanswer:this.lastAnswerOfTrueAndFalse}
  console.log("testannnnnnnnnnnnnnn",this.AnswerOfTrueAndFalse)
  this.StudentASService.PostStudentAnswer(this.AnswerOfTrueAndFalse).subscribe(data=>{
    console.log("testand",data)
  })
}

}
>>>>>>> 4414a31c6452569d82901c8dd277b22f9ff43aee
