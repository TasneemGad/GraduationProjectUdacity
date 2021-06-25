import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DragAndDropService } from 'src/app/Services/drag-and-drop.service';
import { LessonContentService } from 'src/app/Services/LessonContent.service';
import { ProgressService } from 'src/app/Services/progress.service';
import { QuestionsGroupService } from 'src/app/Services/questions-group.service';
import { QuestionsService } from 'src/app/Services/questions.service';
import { VideosService } from 'src/app/Services/videos.service';
import { DragAndDrop } from 'src/app/SharedModels/Interface/Drag&&Drop';
import { CourseVideos } from 'src/app/SharedModels/Interface/ICourseVideos';
import { LessonContent } from 'src/app/SharedModels/Interface/ILessonContent';
import { Question } from 'src/app/SharedModels/Interface/IQestions';
import { QuestionGroup } from 'src/app/SharedModels/Interface/IQuestionGroup';

@Component({
  selector: 'app-lesson-data',
  templateUrl: './lesson-data.component.html',
  // styleUrls: ['./lesson-data.component.scss']
})
export class LessonDataComponent implements OnInit {
currentContentLesson:LessonContent={videoLinkId:1,title:"",description:"",header:"",type:"",questionGroupId:1,lectureId:1,lessonId:1}
idUrl:any
CoursesVideos:CourseVideos
QDragAndDropList:DragAndDrop
IsOpened:boolean=false
QuestionsGroup:QuestionGroup
Questions:Question
AllQuestions:Question[]=[]
QByLessonContent:Question[]
AllQuestionsGroups:QuestionGroup[]
  constructor(private Services:LessonContentService,private active:ActivatedRoute,private videoServices:VideosService,
    private QDragAndDrop:DragAndDropService ,private QuestionsGroupServices:QuestionsGroupService,
    private QuestionsServices:QuestionsService,private progress:ProgressService) { }
   

  ngOnInit(): void {
    this.active.paramMap.subscribe((p:ParamMap)=>{this.idUrl=p.get('id')})
    this.getContentById(this.idUrl);
    this.getAllQuestions();
    this.getAllQuestionsGroup();
    this.getVideosById(this.idUrl);

  } 
  getContentById(id:number){
    this.Services.GetLessonContentById(id).subscribe(sucess=>{
      this.currentContentLesson=sucess,console.log("current",this.currentContentLesson)
      this.getVideosById(id);
      this.getQDragAndDropById(id);
      this.getQuestionsGroupById(id);
      this.getQuestionsById(id);
      this.getQuestionsByLessonContent(id);
    })
  }
  getVideosById(id:number){
    this.videoServices.getAllCourseViedosById(id).subscribe(sucess=>{
      this.CoursesVideos=sucess,console.log("current",this.CoursesVideos)
    })
  }
  getQDragAndDropById(id:number){
    this.QDragAndDrop.getQuestionById(id).subscribe(sucess=>{
      this.QDragAndDropList=sucess,console.log("currentQDragAndDropList",this.QDragAndDropList)
    })
  }
  getQuestionsGroupById(id:number){
    this.QuestionsGroupServices.getQuestionsGroupById(id).subscribe(sucess=>{
      this.QuestionsGroup=sucess,console.log("currentQG",this.QuestionsGroup)
    })
  }
  getQuestionsById(id:number){
    this.QuestionsServices.getQuestionsById(id).subscribe(sucess=>{
      this.Questions=sucess,console.log("currentQList",this.Questions)
    })
  }
  getAllQuestions(){
    this.QuestionsServices.getAllQuestions().subscribe(sucess=>{
      this.AllQuestions=sucess,console.log("currentQList",this.AllQuestions)
    })
  }
  controlSidenav(){
    this.IsOpened = !this.IsOpened
  }
  drop(event: CdkDragDrop<Question[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data, event.container.data,   event.previousIndex,event.currentIndex);
    }
  }
  getAllQuestionsGroup(){
    this.QuestionsGroupServices.getAllQuestionsGroup().subscribe(sucess=>{
      this.AllQuestionsGroups=sucess,console.log("currentQGList",this.AllQuestionsGroups)
    })
  }
  getQuestionsByLessonContent(id:number){
    console.log("first")
    this.QuestionsServices.getQuestionsByLessonContent(id).subscribe(sucess=>{
      this.QByLessonContent=sucess,console.log("currentQGL",this.QByLessonContent)
  })
}

  SubmitAnswer(){
    
  } 
}
