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
import { identity } from 'rxjs';
import { LessonDataComponent } from '../lesson-data/lesson-data.component';
import { StudentAnswerQuestionView } from 'src/app/SharedModels/Interface/StudentAnswerQuestionView';
import { TrueAndFalseService } from 'src/app/Services/true-and-false.service';


@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent implements OnInit, AfterViewInit {
  Isdetails: boolean = true
  text = "expand_less"
  idUrl: any
  IsOpened = true
  checkExist: boolean = false;
  SearchFlagLesson = false;
  currentCourseToSearch: any = ""
  watchObj: IwatchContent = { id: 0, whatchedOrNot: 0, crsID: 0, stID: "", lessonContentID: 0 }
  currentLesson: Lesson = { title: " ", contentNumber: 4, type: "h", lectureId: 3, duration: 125, details: "asd", crsId: 0 }
  allContentCurrentLesson: LessonContent[] = [];
  CurrentLesson: LessonContent
  // progressObj:IProgress={id:0,courseId:0,numOfLesson:0,numOfLessonFinshed:0,studentId:""}
  CoursesVideos: CourseVideos
  idLessonContent: number
  id: any
  LessonSearchList: Lesson[] = []

  //Question:  
  QuestionsList: StudentAnswerQuestionView[] = []
  Question: StudentAnswerQuestionView = { id: 0, flag: false, opt1: "", opt2: "", opt3: "", opt4: "", right: "", title: "", type: "", lessonContentId: 0, questionGroupId: 0 }
  QOptionsList: QOptions[] = []
  QOptionsList2: QOptions[] = []

  QByLessonContent: Question[] = []
  allQuestion: Question
  StudentAnswerByLesson: StudentAnswer[] = []
  StudentAnswer: StudentAnswer
  questionAnswered: StudentAnswer[] = []
  allLessonContent: LessonContent = { id: 1, lectureId: 1, videoLinkId: 1, description: "", questionGroupId: 1, lessonId: 1, title: "", type: "", header: "" }
  progressObj: IProgress = { id: 0, courseId: 0, numOfLesson: 0, numOfLessonFinshed: 0, studentId: "" }
  correctAn: any
  currentStudent: string
  apiUrl = "https://localhost:44326";
  x: boolean
  isAnswered: string = "true"
  notAnsweredYet: any = "false"
  trueAndFalseQuestion: Question[] = []
  dragAndDropQuestion: Question[] = []
  optionalQuestion: Question[] = []
  mayBeAnswerTrueAndFalseQuestion: any
  lastAnswerOfTrueAndFalse: string
  AnswerOfTrueAndFalse: StudentAnswer
  questionTrueAndFalseNotAnswered: Question[] = []
  flag: any = false
  mayBeAnswerOptionQuestion: string
  AnswerOfOptions: StudentAnswer
  lastAnswerOptionQuestion: string
  isAnswerwdOPtion: boolean = false
  notAnsweredYetForOptional: Question[] = []

  option: string = "options"
  TrueAndFalseCheck: string = "t,f"
  iteration:number = 0
  rightAnswer:boolean 
  IsCorrect:string
  flagBtnShow:boolean=true
  imgSrc:string=""
  idBtn:string=""
  idContent:any

  @ViewChild(LessonDataComponent) c: LessonDataComponent

  @Input() CourseId: any
  ngOnChanges(): void {
    //console.log("isChange?", this.CourseId)
    // this.currentCourseToSearch = this.courseSearch
    // //console.log("search?", this.currentCourseToSearch)
  }

  constructor(private active: ActivatedRoute, private router: Router, private lessonService: LessonService,
    private location: Location, private lectureServices: LecturesService, private courseServices: CoursesService,
    private lessonContentService: LessonContentService, private progress: ProgressService, private watch: WatchService,
    private token: AuthenticationService, private videoServices: VideosService, private QuestionsServices: QuestionsService,
    private StudentASService: StudentAnswerService, private accountService: AccountService, private trueAndFalseService:TrueAndFalseService,
    private OptionServices: QuestionOptionsService, 
  ) { }
  ngAfterViewInit(): void {

    //console.log("hhhh",)
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
      const us = this.allLessonContent.lessonId
      this.active.paramMap.subscribe((p: ParamMap) => {
      this.idUrl = p.get('id')
       this.idContent = p.get('idContent')

      this.getLessonById(this.idUrl)
      this.getCurrentCourse(this.idUrl);
      this.getLessonContentById(this.idUrl);
       this.goToLessonData(this.idContent)
       this.getVideosById(this.idContent);
    })
  }

  //Content
  goToLessonData(id: any) {
    this.router.navigate(['lessonContent/',this.idUrl,id])
    this.getQuestion(id)
    this.getLessonOneById(id);
    this.getVideosById(id);
    this.getAllQuestions(id);
    if (sessionStorage.getItem("CourseID") != null) {
      console.log("EEEEE",sessionStorage.getItem("CourseID"))
      this.CourseId = sessionStorage.getItem("CourseID")
      this.getProgress(this.CourseId, id)
    }
    this.getStudentAnswer(id)
    this.idLessonContent = id
  }


  //SidNav
  getCurrentCourse(id: number): any {
    this.lessonService.GetLessonById(id).subscribe(sucess => { 
      this.lectureServices.getLecturesByID(sucess?.lectureId).subscribe(sucess => { 
        this.courseServices.getCoursesByID(sucess.courseId).subscribe(
          data => {

            this.currentCourseToSearch = data
            return data.id
          })
      })
    })
  }
  getLessonById(id: any) {
    this.lessonService.GetLessonById(id).subscribe(sucess => {
    this.currentLesson = sucess
    })
  }
  getLessonContentById(id: number) {
    this.lessonContentService.GetLessonContentByLesson(id).subscribe(sucess => {
      this.allContentCurrentLesson = sucess,
      this.getLessonOneById(id)
      this.getAllQuestions(id);
    })
  }
  getLessonOneById(id: number) {
    this.lessonContentService.GetLessonContentById(id).subscribe(sucess => {
    this.CurrentLesson = sucess
    })
  }
  hideList() {
    this.Isdetails = !this.Isdetails
    this.text = this.Isdetails ? "expand_more" : "expand_less"

  }
  goBack() {
    this.location.back();
    // this.location.path
  }
  controlSidenav() {
    this.IsOpened = !this.IsOpened
  }
  go(id:any){
//  console.log("tttt",this.location.go('LessonContent/',this.idUrl))
 


  }

  //video
  getVideosById(id: number) {
    this.videoServices.getAllCourseViedosById(this.CurrentLesson.videoLinkId).subscribe(sucess => {
      this.CoursesVideos = sucess
    })
  }
  public createImgPath = (serverPath: string) => {
    // console.log(`${this.apiUrl}/${serverPath}`)
    return `${this.apiUrl}/${serverPath}`;
  }

  //progress
  insertWatch(lessonContentID: number, crsId: number) {
    this.watchObj.whatchedOrNot = 1;
    this.watchObj.stID = this.token.getUserId();
    this.watchObj.crsID = crsId
    this.watchObj.lessonContentID = lessonContentID
    this.watch.insertWatch(this.watchObj).subscribe(
      data => {
      }
    )

  }
  getProgress(crsId: any, lessonContentID: number) {
    this.progress.getLessonContentProgress(crsId).subscribe(
      data => {
    console.log("this.watchObj",data)
        this.watch.getWatch(crsId, lessonContentID).subscribe(
          watchObj => {
            this.checkExist = watchObj
            if (this.checkExist == false) {
              data.numOfLessonFinshed++;
              this.insertWatch(lessonContentID, crsId)
              this.progress.UpdateLessonContentProgress(data, data?.id).subscribe(
                progressUpdateObj => {
                }
              )
            }
          }
        )
      })
  }


  //Questions  
  getQuestionsByLessonContent(id: number) {
    console.log("IDDDDDDDDDDDDDD", id)
    this.trueAndFalseQuestion = []
    this.optionalQuestion = []

    this.QuestionsServices.getQuestionsByLessonContent(id).subscribe(sucess => {
      this.QByLessonContent = sucess;
    })
    // this.getNotAnsweredOFTrueAndFalse();

  }
  getStudentAnswerByLessonContent(id: number) {
    // console.log("first")
    this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(sucess => {
      // this.StudentAnswer=sucess,console.log("currentQGL",this.StudentAnswer)
    })
  }
  getAllQuestions(id: number) {
    // console.log("first")
    this.QuestionsServices.getQuestionsById(id).subscribe(sucess => {
      this.allQuestion = sucess
      // console.log("currentQGL",this.allQuestion)
    })
  }
  getStudentAnswer(id: any) {
    this.accountService.getStudentInformation(this.token.getUserId()).subscribe(
      data => {
        // console.log("enter1") 
        // data.id=id
        // console.log("id",id,data)

        this.StudentASService.getStudentAnswerByLessonContent(id).subscribe(
          sucess => {
            // console.log("cc",id,this.StudentAnswerByLesson=sucess,this.StudentAnswerByLesson)
          })
      })

  }
  getQuestion(lessonContentId: number) {
    this.QuestionsList = []

    console.log("lessonContentId", lessonContentId)
    this.QuestionsServices.getQuestionsByLessonContent(lessonContentId).subscribe(sucess => {
    this.QByLessonContent = sucess;

    //Create List Of Question By Lesson Content
    for (let question of sucess) {
      console.log("sucess", sucess)
      this.Question = { id: 0, flag: false, opt1: "", opt2: "", opt3: "", opt4: "", right: "", title: "", type: "", lessonContentId: 0, questionGroupId: 0 }
      this.iteration++
      console.log("Question", this.QByLessonContent)
      this.Question.id = question.id
      this.Question.title = question.title
      this.Question.type = question.type
      this.Question.lessonContentId = question.lessonContentId
      this.Question.questionGroupId = question.questionGroupId
      console.log("question.id", question.id)
     this.QuestionsList.push(this.Question)

    }

    //Add Options Depend on Question Type
    for (const QuestionObj of this.QuestionsList) {
      this.OptionServices.getQuestionsOptionByQuestionId(QuestionObj.id).subscribe(
      sucess=>
      {  console.log("innnnnnnnnnnn",QuestionObj.id,sucess)
        if(QuestionObj.type=="options"){
          QuestionObj.opt1=sucess.opt1
          QuestionObj.opt2=sucess.opt2
          QuestionObj.opt3=sucess.opt3
          QuestionObj.opt4=sucess.opt4
          console.log("innnnnnnnnnnnk",sucess)
        }
        else if(QuestionObj.type="t,f"){
          QuestionObj.opt1="true"
          QuestionObj.opt2="false"
        }
      }) 
      //Add Rigth Answer
       this.StudentASService.getStudentAnswerByLessonContent(lessonContentId).subscribe(
      stdAnswers=>{
             console.log("stdAnswers",stdAnswers)
             for (const stdAnswersObj of stdAnswers) {
               if(stdAnswersObj.questionId==QuestionObj.id){
                QuestionObj.right=stdAnswersObj.studentanswer
                QuestionObj.flag=true;
               }
             }
      }
    )
    }    
    console.log(this.QuestionsList,"TTTTTTTTTT")
  })
}

  //Options Question  
  // getOptions(id:any){
  //   this.QOptionsList = []
  //   this.OptionServices.getQuestionsOptionByQuestionId(id).subscribe(
  //     sucess=>
  //     {    
  //       for(let option of sucess)
  //       {
  //         this.QOptionsList.push(option)
  //         // console.log("ccoop",this.QOptionsList,this.QOptionsList)
  //       }
  //     })
  //     // this.checkIAnsweredOFOptionQuestion()
  // }
  check(value: string) {
    this.mayBeAnswerOptionQuestion = value
  }
  answerMayOfTrueAndFalse(answer: any) {
    this.mayBeAnswerTrueAndFalseQuestion = answer
  }
  postAnswer(idQuestion:number,idContent:number){

    this.lastAnswerOptionQuestion = this.mayBeAnswerOptionQuestion
    this.lastAnswerOfTrueAndFalse = this.mayBeAnswerTrueAndFalseQuestion
    console.log("dgggd",this.lastAnswerOfTrueAndFalse )
    this.OptionServices.getQuestionsOptionByQuestionId(idQuestion).subscribe(data=>{
      if(data.right == this.lastAnswerOptionQuestion && idQuestion == data.qustionId)
      {
        console.log("fffffffff",data.right,this.lastAnswerOptionQuestion)
        this.AnswerOfOptions = {questionId: idQuestion,lessonContentId: idContent ,studentId: this.token.getUserId(),studentanswer:this.mayBeAnswerOptionQuestion}
        this.StudentASService.PostStudentAnswer(this.AnswerOfOptions).subscribe(data=>{
        })
        this.rightAnswer =true
        this.IsCorrect = "Correct"  
        this.imgSrc="assets/correct-illustration-f1348.svg"                  

      }
      else
      {
        // alert("IN COURRECT ANSWER!!")
        this.rightAnswer = false
        this.IsCorrect = "Wrong"
        this.imgSrc="assets/wrong-illustration-ed0a3.svg"  

      }
        })
    this.trueAndFalseService.getReviews().subscribe(data=>{
      for(let ans of data)
      {
        if(ans.qustionId == idQuestion)
        {
          if( ans.right == this.lastAnswerOfTrueAndFalse)
          {
            this.AnswerOfTrueAndFalse = {questionId: idQuestion,lessonContentId: idContent ,studentId: this.token.getUserId(),studentanswer:this.lastAnswerOfTrueAndFalse}
            this.StudentASService.PostStudentAnswer(this.AnswerOfTrueAndFalse).subscribe(data=>{
            })
            this.rightAnswer =true
            this.imgSrc="assets/correct-illustration-f1348.svg"  
            console.log("HERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRe")
            this.IsCorrect = "Correct";
            // this.router.navigate(['lessonContent/',this.idUrl,idContent])

            // this.router.navigate(['lessonContent/',idContent])
            // window.location.href='lessonContent/'+idContent
            //  window.location.reload();
            // this.idBtn=ans.qustionId+"qustionId"
            // (document.getElementById('qustionId'+ans.qustionId ) as HTMLInputElement).disabled = false;


          }
          else
          {
             //alert("IN COURRECT ANSWER!!")
            this.rightAnswer =false
            this.IsCorrect = "Wrong"
            this.imgSrc="assets/wrong-illustration-ed0a3.svg"  

          }  
        }              
        }
      })      
    }


    RefreshContent(){
      if(this.rightAnswer == true)
      {
        window.location.reload()
      }
    }

  //Search
  searchLesson(crsId: number, SearchLessonItem: string) {
    this.lessonService.GetAllLessonByCrsID(crsId).subscribe(
      lessonsdata => {
        this.SearchFlagLesson = true;
        this.LessonSearchList = lessonsdata.filter(Lesson => Lesson.title.toLocaleLowerCase().includes(SearchLessonItem) || Lesson.details.toLocaleLowerCase().includes(SearchLessonItem))
      }
    )
    
  }

}
