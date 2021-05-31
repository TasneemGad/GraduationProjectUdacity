import { HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interfaces/ICategory';
import { ICourse } from 'src/app/SharedModels/Interfaces/ICourse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Categoies:ICategory[] 
  Courses:ICourse[] 
  courseNameForCurrentCategory:any[]
  Error:string
  currentCategoryId:number

  constructor(private catService:CategoryService,private courseServise:CoursesService) { }
    ngOnInit(): void {
      this.getCatigoreis();
      this.getCourses();
    }

    getCatigoreis()
    {
      this.catService.getCategories().subscribe(
        data=>
        {
          console.log("tscat",data)
          this.Categoies = data;
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    getCourses()
    {      
      this.courseServise.getCourses().subscribe(
        data=>
        {
          console.log("course",data)
          this.Courses = data;
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    getHoverCategoryID(idCurrent:number){
      console.log("hoverID",idCurrent)
      this.currentCategoryId = idCurrent;
    }    
}

