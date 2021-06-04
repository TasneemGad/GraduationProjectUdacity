import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
Categoies:ICategory[] 
Error:string
currentCategoryId = 1
Courses:ICourse[] = []
widthCategory:any
fourCourses:ICourse[]
four= ["d","d","d","d "]

  constructor(private catService:CategoryService,private courseServise:CoursesService) { }
  ngOnInit(): void {
    this.getCatigoreis();
    this.getCourses();
    this.getFourCourses();
    this.d();
  }

  getCatigoreis()
  {
    this.catService.getCategories().subscribe(
      data=>
      {
        console.log("ts",data)
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

  getClikedCategoryID(idCurrent:number,witdhcat:any){
    this.currentCategoryId = idCurrent;
    this.getFourCourses()
    // this.widthCategory = witdhcat
    // console.log("width",witdhcat)
  }

<<<<<<< HEAD
  //   <li class="nav-item">
  //   <a href class="nav-link" (click)="logout()">LogOut</a>
  // </li>
=======
 getFourCourses(){
   for(let course of this.Courses)
   {
     if(course.id === this.currentCategoryId)
     {
       console.log("entereeeee")
        for(let i=0 ; i<2 ; i++)
        {
          this.fourCourses.push(this.Courses[i])
        }
     }
   }
 }

d(){
  for(let i of this.Courses)
  {
    console.log("i",i.name)
  }
}
 
>>>>>>> fb95fbc57786f0733d633348019aa466a7fe44f6
}
