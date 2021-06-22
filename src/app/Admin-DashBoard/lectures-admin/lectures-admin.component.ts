import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { ISubCategory } from 'src/app/SharedModels/Interface/ISubCategory';

@Component({
  selector: 'app-lectures-admin',
  templateUrl: './lectures-admin.component.html',
  styleUrls: ['./lectures-admin.component.scss']
})
export class LecturesAdminComponent implements OnInit {
  isOpen:boolean=false
  addLecturesForm:FormGroup
  addLectures:Lectures
  allLecture:Lectures[]
  allCourses:ICourse[]
  LectureByid:Lectures
  constructor(private fb:FormBuilder , private lectureServices:LecturesService ,
    private CoursesService :CoursesService, private router :Router
    ) {}

  ngOnInit(): void {
    this.addLectures={lectureDescription:"",tilte:"",lessoneNumber:1,courseId:1,id:1}
this.addLecturesForm=this.fb.group({
  id: [''],
  tilte:[''],
  courseId: [''],
  lessoneNumber: [''],
  lectureDescription: ['']
})
    this.getAllLectures();
    this.getAllSubCat()
  }
  addNew(){
    this.isOpen=!this.isOpen
  }
 onsubmit(){
  this.AddLectures();
  this.lectureServices.postLectures(this.addLectures).subscribe(sucess=>{
  console.log("lect",sucess)
  this.router.navigateByUrl("/Home")
})
  }
  AddLectures(){
    console.log("add")
    // this.addLectures.id=this.addLecturesForm.value.id
    this.addLectures.tilte=this.addLecturesForm.value.tilte
    this.addLectures.lessoneNumber=this.addLecturesForm.value.lessoneNumber
    this.addLectures.lectureDescription=this.addLecturesForm.value.lectureDescription
    this.addLectures.courseId=this.addLecturesForm.value.courseId
  }
  getAllLectures(){
    console.log("add")
   this.lectureServices.getAllLectures().subscribe(sucess=>{
      this.allLecture=sucess
     console.log("lec",sucess)
   })
  }
  getAllSubCat(){
    console.log("add")
   this.CoursesService.getCourses().subscribe(sucess=>{
      this.allCourses=sucess
     console.log("lec",this.allCourses)
   })
  }
  DeleteItem(id:number){
    if(confirm("Are you sure You Want To delete"))
    {
    this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
      this.LectureByid=sucess 
      console.log("enter",id)
      this.lectureServices.deleteLectures(this.LectureByid.id).subscribe(sucess=>{
        console.log("enter",sucess)
      })
  })
}
   
  }
  updateItem(id:number , update:Lectures){
    this.lectureServices.UpdateLectures(id ,update).subscribe(sucess=>{
      console.log("ee",sucess)
    })
  }
  updateElement(id:any){
    this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
      this.LectureByid=sucess 
      console.log("enter",id)
  })
}
}
