import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { ProgressService } from 'src/app/Services/progress.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';

@Component({
  selector: 'app-program-home',
  templateUrl: './program-home.component.html',
  styleUrls: ['./program-home.component.scss']
})
export class ProgramHomeComponent implements OnInit {
  
  idUrl : any
  currentCourse:ICourse
  progressPercent:number=0;

  constructor(private courseServices:CoursesService, private active:ActivatedRoute,private progress:ProgressService) {}

  ngOnInit() {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')    
    this.getCourseById(this.idUrl)
    this.getProgress(this.idUrl)  
  })
  }

  getCourseById(id:number){
    this.courseServices.getCoursesByID(id).subscribe(sucess=>{console.log(this.currentCourse=sucess)})
  }

  getProgress(crsId:number){
    this.progress.getLessonContentProgress(crsId).subscribe(
      data=>{
        console.log("Data Here",data);
<<<<<<< HEAD
        this.progressPercent=((data?.numOfLessonFinshed/data.numOfLesson)*100)
=======
        this.progressPercent=(Math.round((data.numOfLessonFinshed/data.numOfLesson)*100))
>>>>>>> b29cb7576a9bf39d1570e5374c4e74fb80b72193
    })
  }


}
