import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { OwlOptions } from 'ngx-owl-carousel-o'


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
CoursesByID:ICourse[]=[]
widthCategory:any
fourCourses:ICourse[]
four= ["d","d","d","d "]

customOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 1500,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    1130: {
      items: 4
    },
    940: {
      items: 1
    }
  },
  nav: true
  
}
  constructor(private catService:CategoryService,private courseServise:CoursesService) { }
  ngOnInit(): void {
    this.getCatigoreis();
    this.getCourses();
<<<<<<< HEAD
=======
    this.getCoursesByCurrentCat();
    this.getFourCourses();
    this.d();
>>>>>>> 496c07c388fc206a5f730c262e70be8833a29d17
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
<<<<<<< HEAD
    // this.widthCategory = witdhcat
    // console.log("width",witdhcat)
  }

=======
      this.courseServise.getCoursesByCatID(idCurrent).subscribe(
        data=>
        {
          console.log("course Category",data)
          console.log("dddddddd"+idCurrent)
          this.CoursesByID = data;
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )    
    this.getFourCourses()
  }
  getCoursesByCurrentCat()
  {      
    this.courseServise.getCoursesByCatID(this.currentCategoryId).subscribe(
      data=>
      {
        console.log("course Category",data)
        this.CoursesByID = data;
      },
      Wrong=>
      {
        this.Error = Wrong
      }      
    )
  }
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
>>>>>>> 496c07c388fc206a5f730c262e70be8833a29d17

}
