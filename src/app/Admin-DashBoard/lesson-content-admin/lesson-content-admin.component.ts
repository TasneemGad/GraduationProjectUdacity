import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';

@Component({
  selector: 'app-lesson-content-admin',
  templateUrl: './lesson-content-admin.component.html',
  styleUrls: ['./lesson-content-admin.component.scss']
})
export class LessonContentAdminComponent implements OnInit {
  isOpen: boolean = false
  isUpdate:boolean=false
  addLessonContentForm: FormGroup
  addLessonContent: LessonContent
  allLessonContent: LessonContent[]
  allLectures:Lectures[]
  allCourese:ICourse[]
  lessonContentById:LessonContent
  constructor(private fb: FormBuilder, private LessonContentServices: LessonContentService,
   private CourseServices:CoursesService,private LecturesServices:LecturesService,
    ) { }

  ngOnInit(): void {
    this.addLessonContentForm = this.fb.group({
      id: [''],
      videoLinkId: [''],
      questionGroupId: [''],
      lessonId: [''],
      lectureId: [''],
      description: [''],
      type: [''],
      header: [''],
      title: ['']
    })
    this.getLessonContent();
    this.getAllCoures();
    this.getLectures();

  }

  addNew(){
    this.isOpen=!this.isOpen
  }
  onsubmit(){
    this.AddLessonContent();
   this.LessonContentServices.postLessonContent(this.addLessonContent).subscribe(sucess=>{
    console.log("add",sucess)
  })
   }
   AddLessonContent(){
    this.addLessonContent.id=this.addLessonContentForm.value.id
     this.addLessonContent.videoLinkId=this.addLessonContentForm.value.videoLinkId
     this.addLessonContent.type=this.addLessonContentForm.value.type
     this.addLessonContent.title=this.addLessonContentForm.value.title
     this.addLessonContent.questionGroupId=this.addLessonContentForm.value.questionGroupId
     this.addLessonContent.lessonId=this.addLessonContentForm.value.lessonId
     this.addLessonContent.lectureId=this.addLessonContentForm.value.lectureId
     this.addLessonContent.header=this.addLessonContentForm.value.header
     this.addLessonContent.description=this.addLessonContentForm.value.description


   }
   getLessonContent(){
    console.log("add")
   this.LessonContentServices.GetAllLessonContent().subscribe(sucess=>{
      this.allLessonContent=sucess
     console.log("lec",sucess)
   })
  }
  getAllCoures(){
    console.log("add")
   this.CourseServices.getCourses().subscribe(sucess=>{
      this.allCourese=sucess
     console.log("lec",sucess)
   })
  }
  getLectures(){
    console.log("add")
   this.LecturesServices.getAllLectures().subscribe(sucess=>{
      this.allLectures=sucess
     console.log("lec",sucess)
   })
  }
  DeleteItem(id:number){
    this.LessonContentServices.GetLessonContentById(id).subscribe(sucess=>{
      this.lessonContentById=sucess
      this.LessonContentServices.deleteLessonContent(this.lessonContentById.id).subscribe(sucess=>{
        console.log("enter",sucess)
      })
    })
   
  }
  updateItem(id:number , update:LessonContent){
    this.LessonContentServices.UpdateLessonContent(id ,update).subscribe(sucess=>{
      console.log("ee",sucess)
    })
  }
  updateElement(id:number){
    this.isUpdate=!this.isUpdate
    this.LessonContentServices.GetLessonContentById(id).subscribe(sucess=>{
      
    })
  }
}
