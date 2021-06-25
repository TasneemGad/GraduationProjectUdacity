import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import {QuestionsGroupService } from 'src/app/Services/questions-group.service'
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { VideosService } from 'src/app/Services/videos.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { QuestionGroup } from 'src/app/SharedModels/Interface/IQuestionGroup';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-lesson-content-admin',
  templateUrl: './lesson-content-admin.component.html',
  styleUrls: ['./lesson-content-admin.component.scss']
})
export class LessonContentAdminComponent implements OnInit {
  isOpen: boolean = false
  isUpdate:boolean=false
  addLessonContent: LessonContent
  allLessonContent: LessonContent[]
  allLectures:Lectures[]
  allCourese:ICourse[]
  allQuestionGroup:QuestionGroup[]
  allLecture:Lectures[]=[]
  allCourse:ICourse[]=[]
  allLesson:Lesson[]=[]
  lessonContent:LessonContent={
    id:0,
    videoLinkId:0,
    questionGroupId:0,
    description :"",
    lessonId: 0,
    crsID:0,
    type:"",
    lectureId :0,
    header:"",
    title:""}
    loading = false;
  error = '';
  hide = true;  
  AddLessonContentFailed = false;
  isSuccessful=false;
  CheckId:number=0;
  submitted: boolean;
  addORupdate: string;
  allCourseViedos: CourseVideos[];
  constructor(private VideosService:VideosService,private QuestionsGroupService :QuestionsGroupService, private LessonContentServices: LessonContentService,private LessonService:LessonService,
   private CourseServices:CoursesService,private LecturesServices:LecturesService,
    ) { }

  ngOnInit(): void {
    this.allLessoncontent()
    this.getAllLecture()
    this.getAllLesson()
    this.getAllCourse()
    this.getAllQuestion()
    this.getAllVideos()
    console.log(this.lessonContent.id)

  }

  addNew(){
    this.isOpen=!this.isOpen
  }
  addNewLessonContent()
  {
  
     this.isOpen=!this.isOpen 
     this.lessonContent={
      id:0,
      videoLinkId:0,
      questionGroupId:0,
      description :"",
      lessonId: 0,
      crsID:0,
      type:"",
      lectureId :0,
      header:"",
      title:""}
     if(this.CheckId==this.lessonContent.id)
     {
       this.addORupdate="Save New LessonContent"
     }
  }
 

   getAllLecture(){
    this.LecturesServices.getAllLectures().subscribe(data=>{
        this.allLecture = data
      })
  }
  getAllLesson(){
    this.LessonService.GetAllLesson().subscribe(data=>{
        this.allLesson = data
        console.log("less",data,this.allLesson)
      })
  }
  getAllCourse(){
    this.CourseServices.getCourses().subscribe(data=>{
        this.allCourse = data
        console.log("cou",data,this.allCourse)
      })
  }
  getAllQuestion(){
    this.QuestionsGroupService.getAllQuestionsGroup().subscribe(
      data=>{
        this.allQuestionGroup=data
      }
    )
  }

  getAllVideos(){
    this.VideosService.getAllCourseViedos().subscribe(
      data=>{
        this.allCourseViedos=data
      }
    )
  }
  allLessoncontent()
  {
    this.LessonContentServices.GetAllLessonContent().subscribe(
      data=>{
        this.allLessonContent=data;
      }
    )
  }
  addNewL(LessonContent:LessonContent)
  {
  
    this.LessonContentServices.AddNewLessonContent(LessonContent).subscribe(
      data => {
        console.log("success",data)
        this.isSuccessful = true;
        this.AddLessonContentFailed= false;   
     window.location.href="/DashBoard/LessonContent";

      }  
    ,
    err=>{
      console.log("error")
      this.error=err.message;
      this.AddLessonContentFailed = true;
    
    })
  }
  onUpdateLessonContentSubmit(){
    this.isOpen=true
    this.submitted = true;
   
      console.log("dddddddLesson",this.lessonContent)
      if( this.lessonContent.id==undefined)
       return;
    this.LessonContentServices.UpdateLessonContent(this.lessonContent.id, this.lessonContent)
         .pipe(first())
       .subscribe(
            data => {
             console.log(data)
              window.location.href="/DashBoard/LessonContent"
          
            },
             error => {
                 this.error = error;
                 this.loading = false;
             });
  }

  openUpdateLessonContentModal(lessoncontent:LessonContent){
    this.isOpen=true;

      this.lessonContent=lessoncontent;
      
   if(this.lessonContent.id==undefined)
   return;
   if(this.CheckId!=lessoncontent.id)
       {
        this.addORupdate = "Update";
       }
      }



  openDeleteLessonContentModal(LessonContentId:any){
    console.log("llllllllllllll",LessonContentId);
   this.LessonContentServices.deleteLessonContent(LessonContentId).subscribe(
     data=>{
      // console.log(data)
    window.location.href="/DashBoard/LessonContent"
   })
  
  }
  }


 


  

