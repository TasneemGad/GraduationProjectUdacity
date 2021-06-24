import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { QuestionsGroupService } from 'src/app/Services/questions-group.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { Question } from 'src/app/SharedModels/Interface/IQestions';
import { QuestionGroup } from 'src/app/SharedModels/Interface/IQuestionGroup';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.scss']
})
export class QuestionAdminComponent implements OnInit {

  AllCourses:ICourse[]=[]
  AllLessons:LessonContent[]=[]  
  AllQuestionGroup:QuestionGroup[]=[]  

  apiUrl="https://localhost:44326";
  isOpen:boolean=false
  response:any
  Question:Question={id:0,title:"",lessonContentId:0,type:"",questionGroupId:0}
  check:number=0
  crsLessonVideo:string=""
  AddOrUpdate:string

  Course:ICourse={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0};

  constructor(private questionGroupService:QuestionsGroupService,private lessonService:LessonService,private lessonContentservice:LessonService,private courseservice:CoursesService) { }

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
  getAllQuestionsGroup(){

  }
  getAllLEssonContentByLessonID(){

  }
  getAllLessonsByCrsID(id:number){

  }
  getAllCourses(){
    this.courseservice.getCourses().subscribe(
      data=>{
        this.AllCourses=data
        console.log("Courses",data)
      }
    )
  }
}
