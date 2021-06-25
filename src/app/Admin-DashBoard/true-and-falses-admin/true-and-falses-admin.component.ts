import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../Services/questions.service'
import {Question} from '../../SharedModels/Interface/IQestions'
import {ITrueAndFalse} from '../../SharedModels/Interface/ITrueAndFalse'
import {TrueAndFalseService} from '../../Services/true-and-false.service'
@Component({
  selector: 'app-true-and-falses-admin',
  templateUrl: './true-and-falses-admin.component.html',
  styleUrls: ['./true-and-falses-admin.component.scss']
})
export class TrueAndFalsesAdminComponent implements OnInit {

  QuestionList:Question[]=[];
  TrueAndFalseQuestion: ITrueAndFalse={id:0,right:'',
  qustionId:0};
  isOpen:boolean=false
  check: number=0;
  AddOrUpdate: string='';
  AllTrueAndFalseQuestion:ITrueAndFalse[]=[];
  type: string='t,f';

  constructor(private QuestionsService:QuestionsService,private TrueAndFalseService:TrueAndFalseService) { }


  
  ShowList(){
    this.isOpen=!this.isOpen 
  }
  ShowAddTrueAndFalseQuestion(){
 
    this.isOpen=!this.isOpen 
    this.TrueAndFalseQuestion=
    {id:0,
    right:'',
  qustionId:0}   
   if(this.TrueAndFalseQuestion.id==this.check){
      this.AddOrUpdate="Add TrueAndFalseQuestion"
    }
  }
  ngOnInit(): void {
    this.GetAllQuestionByType();
    this.GetAllTrueAndFalseQuestiones();
    
  }

GetAllQuestionByType()
{
this.QuestionsService.getQuestionsByType(this.type).subscribe(data=>
  {
    this.QuestionList=data
    console.log(this.QuestionList)
    
    

  })
}
GetAllTrueAndFalseQuestiones()
{
  this.TrueAndFalseService.getReviews().subscribe(data=>{
    this.AllTrueAndFalseQuestion=data;
  })
}
AddTrueAndFalseQuestion(){
  console.log(this.TrueAndFalseQuestion)
  this.TrueAndFalseService.AddNewTrueAndFalseQuestions(this.TrueAndFalseQuestion).subscribe(
    data=>{
      console.log("TrueAndFalseQueston",data)
      window.location.href='/DashBoard/TrueAndFalses'
      this.isOpen=false
    }
  )
}

UpdateTrueAndFalseQuestion(TrueAndFalseQuestionObj:ITrueAndFalse,TrueAndFalseQuestionId:number){
  this.isOpen=true
  this.TrueAndFalseService.PutTrueAndFalseQuestions(TrueAndFalseQuestionId,TrueAndFalseQuestionObj).subscribe(
    data=>{
      console.log("TrueAndFalseQueston Update",data)
      window.location.href='/DashBoard/TrueAndFalses' 
    }
  )
}
UpdateTrueAndFalseQuestionForm(TrueAndFalseQuestionObj:ITrueAndFalse)
{
  this.isOpen=true
  
  this.TrueAndFalseQuestion=TrueAndFalseQuestionObj
  if(TrueAndFalseQuestionObj.id!=this.check){
    this.AddOrUpdate="update TrueAndFalseQuestion"
  }

}
deleteTrueAndFalseQuestion(TrueAndFalseQuestionId:number){
  console.log(TrueAndFalseQuestionId,"TrueAndFalseQuestionId")
  this.TrueAndFalseService.DeleteTrueAndFalseQuestions(TrueAndFalseQuestionId).subscribe(
    data=>{
      console.log("TrueAndFalseQueston Delete",data)
      window.location.href='/DashBoard/TrueAndFalses'
    }
  )
}

}
