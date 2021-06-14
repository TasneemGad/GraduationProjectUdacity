import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LecturesService } from 'src/app/Services/lectures.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-core-curriculum',
  templateUrl: './core-curriculum.component.html',
  styleUrls: ['./core-curriculum.component.scss']
})
export class CoreCurriculumComponent implements OnInit {
  isLinear:boolean=false
  lectureList:Lectures[]
  idUrl:any
  constructor(private lectureServices:LecturesService,private active:ActivatedRoute,) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByCourseID(this.idUrl);
  }
  getLecturesByCourseID(id:number){
    console.log("ID")
    this.lectureServices.getLecturesByCoursID(id).subscribe(sucess=>{
      this.lectureList=sucess,
      console.log("kkk",this.lectureList)})
  }

}
