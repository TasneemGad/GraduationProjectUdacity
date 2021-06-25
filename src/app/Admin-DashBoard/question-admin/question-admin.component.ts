import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { QuestionsGroupService } from 'src/app/Services/questions-group.service';
import { QuestionsService } from 'src/app/Services/questions.service';
import { StudentAnswerService } from 'src/app/Services/student-answer.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { Question } from 'src/app/SharedModels/Interface/IQestions';
import { QuestionGroup } from 'src/app/SharedModels/Interface/IQuestionGroup';
import { StudentAnswer } from 'src/app/SharedModels/Interface/StudentAnswer';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.scss']
})
export class QuestionAdminComponent implements OnInit {

  AllCourses:ICourse[]=[]
  AllLessonsContent:LessonContent[]=[]  
  AllQuestionGroup:QuestionGroup[]=[]  
  AllQuestion:Question[]=[]  
  AllstdAnswers:StudentAnswer[]=[]  
  apiUrl="https://localhost:44326";
  isOpen:boolean=false
  response:any
  Question:Question={id:0,title:"",lessonContentId:0,type:"",questionGroupId:0}
  check:number=0
  AddOrUpdate:string
  Course:ICourse={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0};

  constructor(private questionGroupService:QuestionsGroupService,private questionService:QuestionsService,private lessonContentservice:LessonContentService,private courseservice:CoursesService,private stdAnswer:StudentAnswerService) { }

  ShowList(){
    this.isOpen=false
  }
  ShowAddNewQuestion(){
    this.isOpen=true
    this.Question={id:0,title:"",lessonContentId:0,type:"",questionGroupId:0}
    if(this.Question.id!=this.check){
      this.AddOrUpdate="Add"
    }
  }

  ngOnInit(): void {
    this.getAllCourses()
  }
  getAllQuestions(){    
    this.questionService.GetAllQuestionbyIds(this.Question.lessonContentId,this.Question.questionGroupId).subscribe(
      data=>{        
        this.AllQuestion=data         
      }
    )

  }
  getAllLessonsContentByCrsID(crsId:number){
    this.lessonContentservice.GetAllLessonContentByCrsID(crsId).subscribe(
      data=>{        
        this.AllLessonsContent=data
      }
    )
  } 

  updateBtn(QuestionObj:Question){
    this.Question=QuestionObj
    this.isOpen=true

  }
  getAllQuestionGroupByCrsId(CrsID:number){
     this.AllQuestionGroup=[]
        this.questionGroupService.getQuestionGroroupByCrsID(CrsID).subscribe(
        qGroups=>{        
                  this.AllQuestionGroup=qGroups
                }       
        )    
  }
  getAllCourses(){
    this.courseservice.getCourses().subscribe(
      data=>{
        this.AllCourses=data
        console.log("Courses",data)
      }
    )
  }
  UpdateQuestion(ques:Question){
    this.questionService.updateQuestion(ques.id,ques).subscribe(data=>
      {
        console.log("Update Done")
        this.isOpen=false
        this.getAllQuestions();
    })
  }

  deleteQuestion(questionID:number){
    this.questionService.deleteQuestion(questionID).subscribe(data=>
      {
        console.log("delete Done")
        this.getAllQuestions();
    })
  }
  AddNewQuestion(){
    console.log(this.Question)
    this.questionService.insertQuestion(this.Question).subscribe(
      data=>{        
        this.isOpen=false
        this.getAllQuestions();
      }
    )
  }
}
