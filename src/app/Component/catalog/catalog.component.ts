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
  coursesByCategory:ICourse[]
  searchItem: string; 
  apiUrl = "https://localhost:44326";



  constructor(private categoryService:CategoryService, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getCourses()
    this.getCoursesByCategories()
  }


  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
      
    })
  }



  getCoursesByCategories(){
    this.courseService.getCourses().subscribe(data=>{
      this.coursesByCategory = data
    })
  }
  getCourses(){
    this.courseService.getCourses().subscribe(data=>{
      this.courses = data
    })
  }
  onFocusEvent(event: any){
    this.getCourses()
  }
  showCoursesByCategory(catId:number){

    this.courseService.getCoursesByCatID(catId).subscribe(
      courses=>{
        this.courses=[];
        this.courses=courses
      }
    )
                  
  }
  public createImgPath = (serverPath: string) => {
    // console.log(`${this.apiUrl}/${serverPath}`)
    return `${this.apiUrl}/${serverPath}`;
  }
  goToCrsDetails(crsId:number){
    location.href="Course/"+crsId
  }
  showCourse(crsId:number){
    
    this.courseService.getCoursesByID(crsId).subscribe(
      course=>{
        this.courses=[];
        this.courses.push(course)
      }
    )
  }
}
