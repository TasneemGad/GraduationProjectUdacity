import { Component, OnInit } from '@angular/core';
import { LecturesService } from 'src/app/Services/lectures.service';
import { Lectures } from 'src/app/SharedModels/Interface/ILectures';

@Component({
  selector: 'app-lesson-admin',
  templateUrl: './lesson-admin.component.html',
  styleUrls: ['./lesson-admin.component.scss']
})
export class LessonAdminComponent implements OnInit {
  isOpen:boolean=false
  allLecture:Lectures[]=[]
  constructor(private lectureService:LecturesService) { }
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
    this.getAllLecture()
  }

  getAllLecture(){
    this.lectureService.getAllLectures().subscribe(data=>
      {
        this.allLecture = data
      })
  }
}
