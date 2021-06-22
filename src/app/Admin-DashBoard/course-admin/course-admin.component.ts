import { Component, OnInit } from '@angular/core';
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

}
