import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';

@Component({
  selector: 'app-program-home',
  templateUrl: './program-home.component.html',
  styleUrls: ['./program-home.component.scss']
})
export class ProgramHomeComponent implements OnInit {
  
  idUrl : any
  currentCourse:ICourse

  constructor(private courseServices:CoursesService, private active:ActivatedRoute) {}

  ngOnInit() {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')
    this.getCourseById(this.idUrl)
  })
  }

  getCourseById(id:number){
    this.courseServices.getCoursesByID(id).subscribe(sucess=>{console.log(this.currentCourse=sucess)})
  }
}
