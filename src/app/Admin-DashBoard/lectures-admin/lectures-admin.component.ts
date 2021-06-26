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
 

  check:number=0;
  AddOrUpdate:string=""
 
  alllec:Lectures[]=[]
  course:ICourse[]=[]
 
  response:any
  crsId:number=0
  stringResponse:string=""
  apiUrl="https://localhost:44326";
  lec:Lectures={tilte: "", courseId :0,lessoneNumber:0, lectureDescription:"",id:0}

  constructor(private fb:FormBuilder , private lectureServices:LecturesService ,
    private CoursesService :CoursesService, private router :Router
    ) {}
    ShowList(){
      this.isOpen=false
      
    }
    ShowAddNewlec(){
      this.isOpen=true
      this.lec={tilte : "", courseId :0,lessoneNumber:0, lectureDescription:"",id:0}
      if(this.lec.id!=this.check){
        this.AddOrUpdate="Add"
      }
    }
    ngOnInit(): void {
      this.getLec();
      this.getcrs();
    
      
    }
    getLec(){
      this.lectureServices.getAllLectures().subscribe(data=>
        {
          console.log("dataSub",data)
          this.alllec = data
        })
    }
    getcrs(){
      this.CoursesService.getCourses().subscribe(data=>
        {
          console.log("dataSub",data)
          this.course = data
        })
    }
    updateSubbtnClick(lecc:Lectures){
      console.log(lecc,"leccccccccccccccccccccc")
      this.isOpen=true;
      this.lec=lecc;
      this.crsId=this.lec.courseId;
  
      
      if(lecc.id!=this.check){
        this.AddOrUpdate="Update"
      }
      console.log(lecc,"leeeec")
    }
    AddNewSub(){
      console.log(this.lec)
     
      this
      this.lectureServices.postLectures(this.lec).subscribe(
        addesCrs=>{
          console.log("Done")
          // this.AddCrs=true
          this.isOpen=false
          this.getLec();
        }
      )
    }
    UpdateSubData(){
      console.log("00000000000000000000000000",this.lec)
      if(this.lec.id==undefined)
      return;
      this.lectureServices.UpdateLectures(this.lec.id,this.lec).subscribe(
        sucess=>{
          console.log(sucess,"sucess")
          this.isOpen=false
         this.getLec();
          // this.UpdateCrs=true
        }
      )
      console.log(this.lec)
     
    }
  
  
    deleteSub(SubId:number){
     
      this.lectureServices.deleteLectures(SubId).subscribe(
        data=>{
          console.log("Deleted")
           this.getLec();
  
          //this.deleted=true
        }
      )
    }


  
    
}
