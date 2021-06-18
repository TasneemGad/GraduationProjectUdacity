import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { VideosService } from 'src/app/Services/videos.service';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';

@Component({
  selector: 'app-lesson-data',
  templateUrl: './lesson-data.component.html',
  styleUrls: ['./lesson-data.component.scss']
})
export class LessonDataComponent implements OnInit {
currentContentLesson:LessonContent={videoLinkId:1,title:"",description:"",header:"",type:"",questionGroupId:1,lectureId:1,lessonId:1}
idUrl:any
CoursesVideos:CourseVideos
  constructor(private Services:LessonContentService,private active:ActivatedRoute,private videoServices:VideosService) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getContentById(this.idUrl)
  }

  
  getContentById(id:number){
    this.Services.GetLessonContentById(id).subscribe(sucess=>{
      this.currentContentLesson=sucess,console.log("current",this.currentContentLesson)
      this.getVideosById(id)
    })
  }
  getVideosById(id:number){
    this.videoServices.getAllCourseViedosById(id).subscribe(sucess=>{
      this.CoursesVideos=sucess,console.log("current",this.CoursesVideos)
    })
  }
}
