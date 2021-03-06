import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { ProgressService } from 'src/app/Services/progress.service';
import { ICourse } from 'src/app/SharedModels/Interface/ICourses';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';
import { IProgress } from 'src/app/SharedModels/Interface/iprogress';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {
freeCoures:ICourse[]=[]
paidCourses:ICourse[]=[]
gratuatedCourses:ICourse[]=[]
  constructor(private Enrollservices:EnrollService,private courseServices:CoursesService,
    private router:Router, private activeRouter:ActivatedRoute,private Authservices:AuthenticationService,
    private lessonContent:LessonContentService,private progress:ProgressService,
    private progressService:ProgressService) { }
  currentEnrollement:IEnrollCourse[]=[];
  CourseList:ICourse[]=[];
  GraduatedCoursesList:ICourse[]=[];

  isFree=false
  isPaid=false
  isQratuate=false
  flag=false
  lastCourseId:any
  lastCourse:ICourse
  progressObj:IProgress={id:0,numOfLesson:0,numOfLessonFinshed:0,courseId:0,studentId:""}

  ngOnInit(): void {
    this.AllStdCourses();
    this.getlastActiveCourse()
    for (let list of this.CourseList) {
      console.log("free" ,list.price)
 }
  }

AllStdCourses(){
  this.Enrollservices.getAllStdEnrolledCourses().subscribe(
    data => {
      console.log(data)
      for (let enrollCrs of data) {
          console.log(enrollCrs.courseId)
        this.courseServices.getCoursesByID(enrollCrs.courseId).subscribe(
          crsData => {              
            this.CourseList.push(crsData);
            this.progress.getLessonContentProgress(crsData.id).subscribe(
              dataProgress=>{
                if(dataProgress.numOfLesson==dataProgress.numOfLessonFinshed)
                {
                this.GraduatedCoursesList.push(crsData)
                this.isQratuate=true
                }

              }
            )
              if(crsData.price==0){
                this.isFree = true
                this.freeCoures.push(crsData);
              }
              else if(crsData.price>0){
                this.isPaid = true
                this.paidCourses.push(crsData);
              }
              })
          }
    })
    }
routToSetting(){
this.router.navigate(['Setting'])
}
Logout(){
  localStorage.removeItem("lastCourseId")
  this.Authservices.logout();   
}
lastActiveCourse(lastCourseId:any){
  localStorage.setItem("lastCourseId",lastCourseId)
}
getlastActiveCourse(){
  this.lastCourseId = localStorage.getItem("lastCourseId")
  this.courseServices.getCoursesByID(this.lastCourseId).subscribe(
    data => {
      this.lastCourse = data
      this.flag=true
      console.log("lastCourse",this.lastCourseId, this.lastCourse,this.flag)
    })
}
StdProgress(crsID:number){
  this.lessonContent.getLessonContentCount(crsID).subscribe(
    data=>{
      console.log("Data----------",data)

        this.progressObj.numOfLesson=data;
        this.progressObj.courseId=crsID;
        this.progressObj.studentId=this.Authservices.getUserId();
        this.progressObj.numOfLessonFinshed=0;
      console.log("progressObj",this.progressObj)

        this.progress.insertLessonContentProgress(this.progressObj).subscribe(
          progressCrs=>{
            console.log(progressCrs,"Done")
          }
        )
    }
  )
}

}
  
