import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { MentorOrInstractorService } from 'src/app/Services/mentor-or-instractor.service';
import { StudentReviewsService } from 'src/app/Services/student-reviews.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { TwoCoursesSuggestService } from 'src/app/Services/two-courses-suggest.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IMonterOrInstractor } from 'src/app/SharedModels/Interface/IMonterOrInstractor';
import { IReviews } from 'src/app/SharedModels/Interface/IReviews';
import { ISubCategory } from 'src/app/SharedModels/Interface/ISubCategory';

@Component({
  selector: 'app-test-category',
  templateUrl: './test-category.component.html',
  styleUrls: ['./test-category.component.scss']
})
export class TestCategoryComponent implements OnInit {
  Categoies:ICategory[] = []
  Error:string
  Courses:ICourse[] = [];
  currentCategoryName :any;
  currentCategoryID :any
  currentCategory : ICategory
  currentCourses: ICourse[] = []
  InstractorAndMentor : IMonterOrInstractor[] = []
  Reviews:IReviews[] = []
  twoCoursesSuggest:ICourse[] = []
  subCategory:ISubCategory[] =[]
  coursesBySubCategory:ICourse[] =[]
  currentSubCategory:ISubCategory
  currentSubName:string
  currentSubDescription:string

    constructor(private catService:CategoryService,
      private courseServise:CoursesService,
      private instractorService:MentorOrInstractorService,
      private activeRouter:ActivatedRoute, private router:Router,
      private reviewsService:StudentReviewsService,
      private twoCoursesServies:TwoCoursesSuggestService,
      private subCategoryService:SubCategoryService
      ) { }

    ngOnInit(): void {
      this.getCatigoreis();
      this.getCourses();
      this.getInstractor();
      this.getReviews()

      this.activeRouter.paramMap.subscribe((params:ParamMap)=>{
        this.currentCategoryName = params.get('name')
        console.log("currentCat",this.currentCategoryName)

//Question
// this.getDataOfCurrentCategory();
        this.getDataOfCurrentCourses();
        this.getTwoCourses(this.currentCategoryID)
        console.log("twoCoursesId", this.currentCategoryID)
        this.getSubCategory()
        console.log("twoCoursesSuggest", this.twoCoursesSuggest)
      })
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

//Question
    getDataOfCurrentCategory(){
      for(let i of this.Categoies)
      {
        if(i.catName === this.currentCategoryName)
        {
          this.currentCategory = i;
          this.currentCategoryID = i.id
          console.log("1",this.currentCategory)
        }
      }
    }
  

    getDataOfCurrentCourses(){
      this.currentCourses = []
      for(let i of this.Courses)
      {
        if(i.categoryId === this.currentCategoryID)
        {
          this.currentCourses.push(i);
        }
      }
    }

    goToCours(courseID:number){
      this.router.navigate(["/test-category",courseID]);
    }

    getSubCategory()
    {      
      this.subCategoryService.getSubCategory().subscribe(
        data=>
        {
          this.subCategory = data;
          console.log("subCat",this.subCategory)
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    getCoursesBySubCategory(subCategoryID:number)
    {      
      console.log("s1",subCategoryID)
      this.coursesBySubCategory = []
      for(let crs of this.Courses)
      {
        if(crs.subCategoryId == subCategoryID)
        {
          this.coursesBySubCategory.push(crs)
          console.log("coursesBySubCategory",this.coursesBySubCategory)
        }
      }
      for(let sub of this.subCategory )
      {
        if(sub.id == subCategoryID)
        {
          this.currentSubCategory = sub;
          this.currentSubName = this.currentSubCategory.subCategoryTitle
          // this.currentSubDescription = this.currentSubCategory.
          console.log("s2",this.currentSubCategory.subCategoryTitle)
        }
      }
    }

    getInstractor()
    {      
      this.instractorService.getInstractor().subscribe(
        data=>
        {
          this.InstractorAndMentor = data;
          console.log("instractor",data)
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    getReviews()
    {      
      this.reviewsService.getReviews().subscribe(
        data=>
        {
          this.Reviews = data;
          console.log("reviews",data)
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    getTwoCourses(currentCategoryID:number){
      this.twoCoursesSuggest = []
      this.twoCoursesServies.getTwoCourses(currentCategoryID).subscribe(
        data=>
        {
          this.twoCoursesSuggest = data;
          console.log("twoCrs22",this.twoCoursesSuggest)
        },
        Wrong=>
        {
          this.Error = Wrong
        }      
      )
    }

    
}
