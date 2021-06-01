import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interfaces/ICategory';
import { ICourse } from 'src/app/SharedModels/Interfaces/ICourse';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
Categoies:ICategory[] 
Error:string
currentCategoryId = 1
Courses:ICourse[] 
widthCategory:any

// flag = true

// slides: any = [[]];
// chunk(arr:any, chunkSize:any) {
//   let R = [];
//   for (let i = 0, len = arr.length; i < len; i += chunkSize) {
//     R.push(arr.slice(i, i + chunkSize));
//   }
//   return R;
// }


  constructor(private catService:CategoryService,private courseServise:CoursesService) { }
  ngOnInit(): void {
    this.getCatigoreis();
    this.getCourses();
    // this.slides = this.chunk(this.Courses, 4);
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
  }
  
  slides = [
      {'image': 'https://material.angular.io/assets/img/examples/shiba2.jpg'}, 
      {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'},
      {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, 
      {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, 
      {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}
    ];

 
}
