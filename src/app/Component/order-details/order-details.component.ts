import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  flag = false
  courseList:ICourse
  currentCourseId: any;
  total:any
  constructor(private courseServices:CoursesService,private active:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.active.paramMap.subscribe((p:ParamMap)=>{this.currentCourseId=p.get('id')})
    this.getCourseById(this.currentCourseId);
    // this.Discount();
      console.log("currentCourse id ",this.currentCourseId)
  }
  getCourseById(currentCourseId: any) {
    this.courseServices.getCoursesByID(this.currentCourseId).subscribe(sucess=>{console.log(this.courseList=sucess)
      this.total=this.courseList.price- (this.courseList.price*(this.courseList.discount/100))})
  }
// Discount(){
//  this.total= (this.courseList.price-this.courseList.discount)/100
// }
  toggelCode(){
    if(this.flag == false)
    {
      this.flag = true
    }
    else
    {
      this.flag = false
    }
  }
}
