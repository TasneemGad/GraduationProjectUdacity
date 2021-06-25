import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';

@Component({
  selector: 'app-lesson-admin',
  templateUrl: './lesson-admin.component.html',
  styleUrls: ['./lesson-admin.component.scss']
})
export class LessonAdminComponent implements OnInit {
  isOpen:boolean=false
  allLecture:Lectures[]=[]
  allLesson:Lesson[]=[]
  allCourse:ICourse[]=[]
  Lesson: Lesson={id:0,contentNumber:0,title:"",type:"",lectureId:0,crsId:0,duration:0,details:""};
  loading = false;
  error = '';
  hide = true;  
  AddLessonFailed = false;
  isSuccessful=false;
  CheckId:number=0;
  submitted: boolean;
  _LessonToUpdate:Lesson;
  addORupdate: string;

  constructor(private _router:Router,private lectureService:LecturesService,private lessonService:LessonService, private courseService:CoursesService, private fb: FormBuilder) { }
  addNew()
  {
  
     this.isOpen=!this.isOpen 
     

  }

  addNewLesson()
  {
  
     this.isOpen=!this.isOpen 
     this.Lesson={id:0,contentNumber:0,title:"",type:"",lectureId:0,crsId:0,duration:0,details:""};
     if(this.CheckId==this.Lesson.id)
     {
       this.addORupdate="Save New Lesson"
     }
  }
  ngOnInit(): void {
   
    this.getAllLecture()
    this.getAllLesson()
    this.getAllCourse()
    console.log(this.Lesson.id)
  
 
  }


  addNewL(Lesson:Lesson)
  {
  
    this.lessonService.AddNewLesson(Lesson).subscribe(
      data => {
        console.log("success",data)
        this.isSuccessful = true;
        this.AddLessonFailed= false;   
     window.location.href="/DashBoard/Lesson";

      }  
    ,
    err=>{
      console.log("error")
      this.error=err.message;
      this.AddLessonFailed = true;
    
    })
  }

 
  getAllLecture(){
    this.lectureService.getAllLectures().subscribe(data=>{
        this.allLecture = data
      })
  }
  getAllLesson(){
    this.lessonService.GetAllLesson().subscribe(data=>{
        this.allLesson = data
        console.log("less",data,this.allLesson)
      })
  }
  getAllCourse(){
    this.courseService.getCourses().subscribe(data=>{
        this.allCourse = data
        console.log("cou",data,this.allCourse)
      })
  }
 

  onUpdateLessonSubmit(){
    this.isOpen=true
    this.submitted = true;
   
      console.log("dddddddLesson",this.Lesson)
      if( this.Lesson.id==undefined)
       return;
    this.lessonService.PutLesson(this.Lesson.id, this.Lesson)
         .pipe(first())
       .subscribe(
            data => {
             console.log(data)
              window.location.href="/DashBoard/Lesson"
          
            },
             error => {
                 this.error = error;
                 this.loading = false;
             });
  }

  openUpdateLessonModal(lesson:Lesson){
    this.isOpen=true;

      this.Lesson=lesson;
      
   if(this.Lesson.id==undefined)
   return;
   if(this.CheckId!=lesson.id)
       {
        this.addORupdate = "Update";
       }
      }



  openDeleteLessonModal(LessonId:any){
    console.log("llllllllllllll",LessonId);
   this.lessonService.DeleteLesson(LessonId).subscribe(
     data=>{
      // console.log(data)
    window.location.href="/DashBoard/Lesson"
   })
  
  }
}
