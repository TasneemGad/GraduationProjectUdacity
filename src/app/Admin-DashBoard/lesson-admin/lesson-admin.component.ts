import { Component, OnInit } from '@angular/core';
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
  constructor(private lectureService:LecturesService,private lessonService:LessonService, private courseService:CoursesService) { }
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
    this.getAllLecture()
    this.getAllLesson()
    this.getAllCourse()
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
}
