import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { MentorOrInstractorService } from 'src/app/Services/mentor-or-instractor.service';
import { StudentReviewsService } from 'src/app/Services/student-reviews.service';
import { StudentStoriesService } from 'src/app/Services/student-stories.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { TwoCoursesSuggestService } from 'src/app/Services/two-courses-suggest.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IMonterOrInstractor } from 'src/app/SharedModels/Interface/IMonterOrInstractor';
import { IReviews } from 'src/app/SharedModels/Interface/IReviews';
import { IStudentStory } from 'src/app/SharedModels/Interface/IStudentStory';
import { ISubCategory } from 'src/app/SharedModels/Interface/ISubCategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  Categoies: ICategory[] = []
  Error: string
  Courses: ICourse[] = [];
  currentCategoryName: any;
  currentCategoryID: number
  currentCategory: ICategory
  currentCourses: ICourse[] = []
  subCategory: ISubCategory[] = []
  coursesBySubCategory: ICourse[] = []
  currentSubCategory: ISubCategory
  currentSubName: string
  currentSubDescription: string
  stories: IStudentStory[] = []
  studentStories: IStudentStory
  defultSubID: number
  freeCourses: ICourse[] = []

  constructor(private catService: CategoryService,
    private courseServise: CoursesService,
    private activeRouter: ActivatedRoute, private router: Router,
    private subCategoryService: SubCategoryService,
    private StudentStoriesService: StudentStoriesService) { }

  ngOnInit(): void {
      this.getCatigoreis();
      this.getCourses();
      this.activeRouter.paramMap.subscribe((params: ParamMap) => {
      this.currentCategoryName = params.get('name')
      console.log("currentCat", this.currentCategoryName)
      this.makDefultOfSubCategory()
      //Question
      this.getDataOfCurrentCategory();
      this.getDataOfCurrentCourses();
      this.getSubCategory()
      this.getFreeCourses();
    })
    
  }
 

  

  getCatigoreis() {
    (this.catService.getCategories().subscribe(
      data => {
        console.log("ts", data)
        this.Categoies = data;
      },
      Wrong => {
        this.Error = Wrong
      }
    )
    )
  }

  getCourses() {
    this.courseServise.getCourses().subscribe(
      data => {
        console.log("course", data)
        this.Courses = data;
      },
      Wrong => {
        this.Error = Wrong
      }
    )
  }

  //Question
  getDataOfCurrentCategory() {
    for (let i of this.Categoies) {
      if (i.catName === this.currentCategoryName) {
        this.currentCategory = i;
        this.currentCategoryID = i.id
      }
    }
  }


  getDataOfCurrentCourses() {
    this.currentCourses = []
    for (let i of this.Courses) {
      if (i.categoryId === this.currentCategoryID) {
        this.currentCourses.push(i);
      }
    }
  }

  goToCours(courseID: number) {
    this.router.navigate(["/Course", courseID]);
  }

  getSubCategory() {
    this.subCategoryService.getAllSubCategory().subscribe(
      data => {
        this.subCategory = data;
        console.log("subCat", this.subCategory)
        for (let sub of data) {
          if (sub.categoryID == this.currentCategoryID) {
            this.currentSubName = sub.subCategoryTitle  //data[0].subCategoryTitle
            this.currentSubDescription = sub.subCategoryDescribtion
            console.log("dddd", sub.subCategoryDescribtion)
            this.defultSubID = sub.id
            console.log("sssss", this.currentSubName, this.defultSubID)
            return
          }
        }
      },
      Wrong => {
        this.Error = Wrong
      }
    )
  }

  makDefultOfSubCategory() {
    this.coursesBySubCategory = []
    this.courseServise.getCourses().subscribe(
      data => {
        for (let crs of data) {
          if (crs.subCategoryId == this.defultSubID) {
            this.coursesBySubCategory.push(crs);
          }
        }
        console.log("Defcourse", this.coursesBySubCategory)
      },
      Wrong => {
        this.Error = Wrong
      }
    )

    // this.coursesBySubCategory = []
    // for(let crs of this.Courses)
    // {
    //   // if(  crs.categoryId == this.currentCategoryID)
    //   if(crs.subCategoryId == this.defultSubID) 
    //   {
    //     this.coursesBySubCategory.push(crs) 
    //     console.log("defult",this.coursesBySubCategory)
    //   }
    // }
  }


  // getCoursesBySubCategory(subCategoryID: number) {
  //   console.log("s1", subCategoryID)
  //   this.coursesBySubCategory = []
  //   for (let crs of this.Courses) {
  //     if (crs.subCategoryId == subCategoryID) {
  //       this.coursesBySubCategory.push(crs)
  //       console.log("coursesBySubCategory", this.coursesBySubCategory)
  //     }
  //   }
  //   for (let sub of this.subCategory) {
  //     if (sub.id == subCategoryID) {
  //       this.currentSubCategory = sub;
  //       this.currentSubName = this.currentSubCategory.subCategoryTitle
  //       this.currentSubDescription = this.currentSubCategory.subCategoryDescribtion
  //       console.log("s2", sub)
  //     }
  //   }
  //   this.getStories()
  // }

  // getStories() {
  //   this.StudentStoriesService.getStudentStory().subscribe(
  //     data => {
  //       console.log("coursehbbhjb", data)
  //       for (let std of data) {
  //         this.stories = data
  //         // if(std.specialzation == this.currentSubName)
  //         // {
  //         // this.studentStories = std;
  //         // console.log("story", this.studentStories)
  //         // }
  //       }
  //     },
  //     Wrong => {
  //       this.Error = Wrong
  //     }
  //   )
  // }
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
      if(sub.id === subCategoryID)
      {
        this.currentSubCategory = sub;
        this.currentSubName = this.currentSubCategory.subCategoryTitle
        this.currentSubDescription = this.currentSubCategory.subCategoryDescribtion
        console.log("s2",sub)      
         

        console.log("curNammmmmm",this.currentSubName)  
      }
    }
   this.getStories()
  }

  getStories()
  {      
    this.StudentStoriesService.getTopStudentStories(this.currentCategoryName).pipe().subscribe(
      data=>
      {       
        this.stories=data;
        console.log("story", this.stories)
        }
      
      ,
      Wrong=>
      {
        this.Error = Wrong
      }      
    )
  }
  getFreeCourses() {
    this.freeCourses = []
    for (let crs of this.Courses) {
      if (crs.price === 0 && crs.categoryId === this.currentCategoryID) {
        this.freeCourses.push(crs)
      }
    }
    console.log("free", this.freeCourses)
  }
}