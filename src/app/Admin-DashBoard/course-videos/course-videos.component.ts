import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { VideosService } from 'src/app/Services/videos.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { Lesson } from 'src/app/SharedModels/Interface/ILesson';

@Component({
  selector: 'app-course-videos',
  templateUrl: './course-videos.component.html',
  styleUrls: ['./course-videos.component.scss']
})
export class CourseVideosComponent implements OnInit {
  constructor(private courseService:CoursesService,private lessonService:LessonService,private crsVideoService:VideosService) { }



  AllCourses:ICourse[]=[]
  AllLessons:Lesson[]=[]
  AllCrsVideos:CourseVideos[]=[]
  apiUrl="https://localhost:44326";
  isOpen:boolean=false
  response:any
  CrsVideo:CourseVideos={id:0,videoName:"",lessonId:0,courseId:0,videoURL:""}
  check:number=0
  crsLessonVideo:string=""
  AddOrUpdate:string


  ShowList(){
    this.isOpen=false
  }
  ShowAddNewCrsVideo(){
    this.isOpen=true
    this.CrsVideo={id:0,videoName:"",lessonId:0,courseId:0,videoURL:""}
    if(this.CrsVideo.id!=this.check){
      this.AddOrUpdate="Add"
    }
  }

  ngOnInit(): void {
    this.getAllCourses()  
    // this.getAllLessonsByCrsID(this.CrsVideo.courseId)
  }
  getAllCourses(){
    this.courseService.getCourses().subscribe(data=>{
      console.log("Crs",data)
      this.AllCourses=data
    })    
  }
  getAllLessonsByCrsID(crsId:number){
    this.lessonService.GetAllLessonByCrsID(crsId).subscribe(data=>{
      console.log("Lessons",data)
      this.AllLessons=data
    })    
  }
  public uploadCCrsVideoFinished = (event:any) => { 
    this.response = event;      
    console.log(this.response.dbPath) 
    this.CrsVideo.videoURL=this.response.dbPath
  }

  public createVideoPath = (imagePath: string) => {  
    return `${this.apiUrl}/${imagePath}`;
}

AddNewCourseVideo(){
  if(this.CrsVideo.videoURL)
  {
  console.log(this.CrsVideo)
  this.crsVideoService.insertCourseViedo(this.CrsVideo).subscribe(
    data=>{
      console.log("Done")
      this.getCrsVideosList();
    this.isOpen=false
    }
  )
  }
}

getCrsVideosList(){
  this.crsVideoService.getCourseVideosByLessonId(this.CrsVideo.lessonId).subscribe(
    data=>{
      console.log("Doneeeeeeeeeeeeeeeeeeeeeeeee",data)
      this.AllCrsVideos=data
    }
  )
  
}
deleteCrsVideo(crsVideoId:number){
  this.crsVideoService.deleteCourseVideos(crsVideoId).subscribe(
    data=>{
      console.log("Doneeeeeeeeeeeeeeeeeeeeeeeee",data)
      this.getCrsVideosList();
    this.isOpen=false

    }
  )
}

}
