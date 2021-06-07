import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
CoursesByID:ICourse[]=[]

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
    this.getClikedCategoryID(this.currentCategoryId,55);
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
    // this.widthCategory = witdhcat
    // console.log("width",witdhcat)
  

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
    // this.getFourCourses()
   
      }
 


}
