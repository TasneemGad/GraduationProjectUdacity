import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
<<<<<<< HEAD
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
 
=======
  onchang:any 
  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> 4caa98feb0519c4534cd16a77941a19e9af7197d
}
