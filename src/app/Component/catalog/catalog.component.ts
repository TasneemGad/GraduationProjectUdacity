import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  categories:ICategory[]
  courses:ICourse[]
  searchItem: string; 

  constructor(private categoryService:CategoryService, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getCourses()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data
    })
  }
  getCourses(){
    this.courseService.getCourses().subscribe(data=>{
      this.courses = data
    })
  }
}
