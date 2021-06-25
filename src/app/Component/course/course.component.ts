import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { LecturesService } from 'src/app/Services/lectures.service';
import { MentorOrInstractorService } from 'src/app/Services/mentor-or-instractor.service';
import { StudentReviewsService } from 'src/app/Services/student-reviews.service';
import { TwoCoursesSuggestService } from 'src/app/Services/two-courses-suggest.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';
import { IMonterOrInstractor } from 'src/app/SharedModels/Interface/IMonterOrInstractor';
import { IReviews } from 'src/app/SharedModels/Interface/IReviews';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
isClick:boolean=false
isClosed:boolean=false
text="Show more";
textHide="Hide DETAILS";
Isdetails:boolean=true
   courseList:ICourse
   courseListImg:ICourse[]
   lectureList:Lectures
   lectureAllList:Lectures[]=[]
   lectureAllListcrs:Lectures[]
   idUrl:any
   idUrlLecture:any
   InstsList : IMonterOrInstractor[] = []
   Reviews:IReviews[] = []
   Error:string
   twoCoursesSuggest:ICourse[] = []
   apiUrl="https://localhost:44326";

   constructor(private courseServices:CoursesService,private active:ActivatedRoute ,
    private instractorService:MentorOrInstractorService,
    private reviewsService:StudentReviewsService,
    private twoCoursesServies:TwoCoursesSuggestService,
     private lectureServices:LecturesService) { }  
  
   ngOnInit(): void {
    this.getInstractor();
    this.getReviews()

    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
  
    this.getLecturesesByCrs(this.idUrl)
  
  
  })
  //  this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrlLecture=p.get('lid')})

    this.getCourse();
    this.getCourseById(this.idUrl);
    this.getLecturesByID(this.idUrl);
    this.getLectureses();
    this.getTwoCourses(this.idUrl);
    this.getLecturesesByCrs(this.idUrl)
    console.log("ss",this.idUrl)
  }
  

  gochange()
  {
   this.isClick = !this.isClick
   
  }
  gosecond()
  {
    this.isClick = !this.isClick

  }
  close()
  {
    this.isClosed = !this.isClosed
    this.text=this.isClosed?"Show less":"Show more"

  }
  detailsHide(){
    this.Isdetails = !this.Isdetails
    this.textHide=this.Isdetails?"HIDE DETAILS" :"SEE DETAILS"
  }
  getCourse(){
    this.courseServices.getCourses().subscribe(sucess=>{console.log(this.courseListImg=sucess , console.log("cou",this.courseListImg))})
  }
getCourseById(id:number){
  this.courseServices.getCoursesByID(id).subscribe(sucess=>{console.log(this.courseList=sucess)})
}
getLecturesByID(id:number){
  console.log("ID")
  this.lectureServices.getLecturesByID(id).subscribe(sucess=>{
    this.lectureList=sucess,
    console.log("kkk",this.lectureList)})
}
getLectureses(){
   this.lectureServices.getAllLectures().subscribe(suces=>{
  console.log("enter2")
    this.lectureAllList=suces,
    console.log(this.lectureAllList)},err=>{console.log(err)})
}
getLecturesesByCrs(id:number){
  this.lectureServices.getLecturesByCoursID(id).subscribe(suces=>{
 console.log("enterall")
   this.lectureAllListcrs=suces,
   console.log("enterajl",this.lectureAllList)},err=>{console.log(err)})
}

getInstractor()
{      
  this.instractorService.getTopFourInstracor().subscribe(
    data=>
    {
      this.InstsList = data;
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
  this.reviewsService.getTopReviews().subscribe(
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
public createImgPath = (serverPath: string) => {
  console.log(`${this.apiUrl}/${serverPath}`)
   return `${this.apiUrl}/${serverPath}`;
}

}
