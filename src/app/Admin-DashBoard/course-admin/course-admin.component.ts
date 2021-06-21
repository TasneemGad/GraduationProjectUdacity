import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
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
  constructor( private courseService : CoursesService, private subCategoryService: SubCategoryService) { }
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
    this.getAllCourses()
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

}
