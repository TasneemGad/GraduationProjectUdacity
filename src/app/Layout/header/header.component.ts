import { HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Categoies:ICategory[] 
  Courses:ICourse[] 
  CoursesByID:ICourse[]=[]
  courseNameForCurrentCategory:any[]
  Error:string
  currentCategoryId:number
 

  constructor(private auth:AuthenticationService,private catService:CategoryService,private courseServise:CoursesService,private router:Router) { }
    ngOnInit(): void {
      this.getCatigoreis();
      this.getCourses();
      this.isLoggedIn();
      this.role();
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
    }

    getCurrentCategory(currentCategory:any){           
               this.router.navigate(["/school-of",currentCategory]);
            
    }
    isLoggedIn(){
      return this.auth.isLoggedIn();
     }
     role(){
     return this.auth.getRole();
     }
  }

     