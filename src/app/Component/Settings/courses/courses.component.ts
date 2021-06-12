import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LecturesService } from 'src/app/Services/lectures.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  lectureList:Lectures[]
  lectureAllList:Lectures[]
  constructor(  private lectureServices:LecturesService,private active:ActivatedRoute) { }
  idUrl:any
  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByID(this.idUrl);
    this.getLectureses();
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
 

}
