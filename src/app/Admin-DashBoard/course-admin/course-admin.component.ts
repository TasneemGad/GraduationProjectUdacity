import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { ISubCategory } from 'src/app/SharedModels/Interface/ISubCategory';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss']
})
export class CourseAdminComponent implements OnInit {

  isOpen:boolean=false
 

  check:number=0;
  AddOrUpdate:string=""
  allCourse:ICourse[]=[]
  allSubcategory:ISubCategory[]=[]
  allCategory:ICategory[]=[]
  crsImg:string="";
  PartImg:string=""
  response:any
  catId:number=0
  stringResponse:string=""
  apiUrl="https://localhost:44326";


  Course:ICourse={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0}
  constructor( private courseService : CoursesService, private subCategoryService: SubCategoryService,
               private categoryService : CategoryService,private Lecture:LecturesService) { }
  addNew(){
    this.isOpen=!this.isOpen
  }
  AddNewCrs(){
    this.isOpen=!this.isOpen
    this.PartImg=""
    this.crsImg=""
    this.Course={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0};

  }
  ngOnInit(): void {
    this.getAllCourses()
    this.getAllCategory()
    this.getAllSubCategory()
    if(this.Course.id == this.check){
      this.AddOrUpdate="Add New"
    }
   
  }

  getAllCourses(){
    this.courseService.getCourses().subscribe(data=>
      {
        console.log("dataCourse",data)
        this.allCourse = data
      })
  }
  getAllSubCategory(){
    this.subCategoryService.getAllSubCategory().subscribe(data=>
      {
        console.log("dataSub",data)
        this.allSubcategory = data
      })
  }
  getAllCategory(){
    this.categoryService.getCategories().subscribe(data=>
      {
        console.log("dataSub",data)
        this.allCategory = data
      })
  }
  updateCrsbtnClick(Crs:ICourse){
    this.isOpen=true;
    this.Course=Crs;
    this.catId=this.Course.categoryId
    this.crsImg="https://localhost:44326/"+Crs.crsLogo
    this.PartImg="https://localhost:44326/"+Crs.partLogo
    if(Crs.id!=this.check){
      this.AddOrUpdate="Update"

    }
    console.log(Crs,"Crrrrrrrrrrrrrrrrrrs")
  }
  public uploadCrsLogoFinished = (event:any,Crsid:number,Course:ICourse) => { 
    this.response = event;    
    console.log(this.response)      
     Course.crsLogo=this.response.dbPath
     this.courseService.updateCourses(Crsid,Course).subscribe(
       data=>{
         console.log(data)
       }
     )


  }
  public uploadCrsPartFinished = (event:any,Crsid:number,Course:ICourse) => { 
    this.response = event;    
    Course.partLogo=this.response.dbPath
    this.courseService.updateCourses(Crsid,Course).subscribe(
      data=>{
        console.log(data)
      }
    )
  }
  public uploadCrsImgLogoFinished = (event:any) => { 
    this.response = event;      
    console.log(this.response.dbPath) 
    this.Course.crsLogo=this.response.dbPath
  }
  public uploadCrsPartLogoFinished = (event:any) => { 
    this.response = event;      
    console.log(this.response.dbPath) 
    this.Course.partLogo=this.response.dbPath
  }


  AddNewCourse(){
    console.log(this.Course)
    this.courseService.insertCourses(this.Course).subscribe(
      addesCrs=>{
        console.log("Done")
        // this.AddCrs=true
      }
    )
  }
  UpdateCrsData(){
    this.courseService.updateCourses(this.Course.id,this.Course).subscribe(
      sucess=>{
        console.log(sucess,"sucess")
        // this.UpdateCrs=true
      }
    )
    console.log(this.Course)
    console.log(this.uploadCrsPartFinished)
  }
  deleteCourse(CrsId:number){
    this.courseService.deleteCourses (CrsId).subscribe(
      data=>{
        console.log("Deleted")
        // this.deleted=true
      }
    )
  }
  public createImgPath = (imagePath: string) => {  
        return `${this.apiUrl}/${imagePath}`;
}
}
