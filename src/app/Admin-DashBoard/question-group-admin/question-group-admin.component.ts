import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { QuestionsGroupService } from 'src/app/Services/questions-group.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { QuestionGroup } from 'src/app/SharedModels/Interface/IQuestionGroup';

@Component({
  selector: 'app-question-group-admin',
  templateUrl: './question-group-admin.component.html',
  styleUrls: ['./question-group-admin.component.scss']
})
export class QuestionGroupAdminComponent implements OnInit {

 apiUrl="https://localhost:44326";
  AllCourses:ICourse[]=[]
  AllLectures:Lectures[]=[]
  AllLessons:Lesson[]=[]
  AllQuestionGroups:QuestionGroup[]=[]
  isOpen:boolean=false
  response:any
  QuestionGroup:QuestionGroup={id:0,title:"",lessonId:0,courseId:0,lectureId:0,qGroupID:0}
  check:number=0
  crsLessonVideo:string=""
  AddOrUpdate:string

  constructor(private courseService:CoursesService,private lessonService:LessonService,private lectureService:LecturesService,private questionGroupservice:QuestionsGroupService) { }



 


  ShowList(){
    this.isOpen=false
  }
  ShowAddQuestionGroup(){
    this.isOpen=true
    this.QuestionGroup={id:0,title:"",lessonId:0,courseId:0,lectureId:0,qGroupID:1}
    if(this.QuestionGroup.id!=this.check){
      this.AddOrUpdate="Add"
    }
  }

  ngOnInit(): void {
    this.getAllCourses()
  }
  getAllCourses(){
    this.courseService.getCourses().subscribe(data=>{
      console.log("Crs",data)
      this.AllCourses=data
    })    
  }

  getAllLecturesByCrsID(crsId:number){
    this.lectureService.getLecturesByCoursID(crsId).subscribe(data=>{
      console.log("Lectures",data)
      this.AllLectures=data
    })    
  }

  getAllLessonsByLectID(lectID:number){
    this.lessonService.GetAllLessonByLectureId(lectID).subscribe(data=>{
      console.log("Lessons",data)
      this.AllLessons=data
    })    
  }
  getListOfQuestionGroupByCrsandLectandLessonIds(){
    this.questionGroupservice.getQuestionGroupList(this.QuestionGroup.courseId,this.QuestionGroup.lectureId,this.QuestionGroup.lessonId)
    .subscribe(
      data=>{
        console.log("QuestionGroup",data)
        this.AllQuestionGroups=data
      }
    )

  }

  AddQuestionGroup(){
    console.log(this.QuestionGroup)
    this.questionGroupservice.insertQuestionGroup(this.QuestionGroup).subscribe(
      data=>{
        console.log("QuestonGroup",data)
        this.getListOfQuestionGroupByCrsandLectandLessonIds()
        this.isOpen=false


      }
    )
  }
  UpdateQuestionGroup(QuestionGroupObj:QuestionGroup,QuestionGroupId:number){
    this.questionGroupservice.updateQuestionGroup(QuestionGroupId,QuestionGroupObj).subscribe(
      data=>{
        console.log("QuestonGroup Update",data)
        this.getListOfQuestionGroupByCrsandLectandLessonIds()
        this.isOpen=false

        
      }
    )
  }
  UpdateQuestionGroupForm(QuestionGroupOObj:QuestionGroup)
  {
    this.isOpen=true
    this.QuestionGroup=QuestionGroupOObj
    if(this.QuestionGroup.id==this.check){
      this.AddOrUpdate="update"
      
    }

  }
  deleteQuestionGroup(QuestionGroupId:number){
    console.log(QuestionGroupId,"QuestionGroupId")
    this.questionGroupservice.deleteQuestionGroup(QuestionGroupId).subscribe(
      data=>{
        console.log("QuestonGroup Delete",data)
        this.getListOfQuestionGroupByCrsandLectandLessonIds()
      }
    )
  }
}
