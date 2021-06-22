import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
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
  allCourse:ICourse[]=[]
  allSubcategory:ISubCategory[]=[]
  allCategory:ICategory[]=[]
  crsImg:string="";
  PartImg:string=""
  response:any
  catId:number=0
  stringResponse:string=""

  Course:ICourse={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0}
  constructor( private courseService : CoursesService, private subCategoryService: SubCategoryService,
               private categoryService : CategoryService) { }
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
    this.getAllCourses()
    this.getAllCategory()
    this.getAllSubCategory()
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
  updateCrs(Crs:ICourse){
    this.isOpen=true;
    this.Course=Crs;
    this.catId=this.Course.categoryId
    this.crsImg="https://localhost:44326/"+Crs.crsLogo
    this.PartImg="https://localhost:44326/"+Crs.partLogo
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
  UpdateCrsData(){
    console.log(this.stringResponse)
    console.log(this.uploadCrsPartFinished)

  }
}
