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
  part:any
  constructor(private lectureServices:LecturesService,private active:ActivatedRoute,) { }

  ngOnInit(): void {
    // this.part++
        this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getLecturesByCourseID(this.idUrl,this.part);
  }
  getLecturesByCourseID(id:number,index:number){
    console.log("ID")
    this.lectureServices.getLecturesByCoursID(id).subscribe(sucess=>{
      this.lectureList=sucess,
      console.log("kkk",this.lectureList)})
      this.getNextLectures(id);
  }
  getNextLectures(id:any){
    console.log("ID")
    this.lectureServices.getLecturesByID(id+1).subscribe(sucess=>{
      this.part=sucess,
      console.log("L",this.part.tilte)})
  }

}
