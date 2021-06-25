import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../Services/questions.service'
import {Question} from '../../SharedModels/Interface/IQestions'
import {QOptions} from '../../SharedModels/Interface/QuestionOtions'
import {QuestionOptionsService} from '../../Services/question-options.service'



@Component({
  selector: 'app-question-optiones-admin',
  templateUrl: './question-optiones-admin.component.html',
  styleUrls: ['./question-optiones-admin.component.scss']
})
export class QuestionOptionesAdminComponent implements OnInit {
  QuestionList:Question[]=[];
  Questionoption: QOptions={id:0,right:'',
    opt1:'',
    opt2:'',
    opt3:'',
   opt4:'',
  qustionId:0};
  isOpen:boolean=false
  check: number=0;
  AddOrUpdate: string='';
  AllQuestionOption: QOptions[]=[];
  type: string='options';

  constructor(private QuestionsService:QuestionsService,private QuestionOptionsService:QuestionOptionsService) { }

  ShowList(){
    this.isOpen=!this.isOpen 
  }
  ShowAddQuestionOption(){
 
    this.isOpen=!this.isOpen 
    this.Questionoption=
    {id:0,
    right:'',
    opt1:'',
    opt2:'',
    opt3:'',
   opt4:'',
  qustionId:0}   
   if(this.Questionoption.id==this.check){
      this.AddOrUpdate="Add  Multi-Choice Questions"
    }
  }
  ngOnInit(): void {
    this.GetAllQuestionByType();
    this.GetAllGuestionesOption();
    
  }

GetAllQuestionByType()
{
this.QuestionsService.getQuestionsByType(this.type).subscribe(data=>
  {
    this.QuestionList=data
    console.log(this.QuestionList)
    
    

  })
}
GetAllGuestionesOption()
{
  this.QuestionOptionsService.getAllQuestionsOption().subscribe(data=>{
    this.AllQuestionOption=data;
  })
}
AddQuestionOption(){
  console.log(this.Questionoption)
  this.QuestionOptionsService.AddNewQuestionsOption(this.Questionoption).subscribe(
    data=>{
      console.log("QuestonOption",data)
      window.location.href='/DashBoard/QuestionOptiones'
      this.isOpen=false


    }
  )
}

UpdateQuestionOption(QuestionOptionObj:QOptions,QuestionoptionId:number){
  this.isOpen=true
  this.QuestionOptionsService.PutQuestionsOption(QuestionoptionId,QuestionOptionObj).subscribe(
    data=>{
      console.log("Questonoption Update",data)
      window.location.href='/DashBoard/QuestionOptiones'
   

      
    }
  )
}
UpdateQuestionOptionForm(QuestionOptionObj:QOptions)
{
  this.isOpen=true
  
  this.Questionoption=QuestionOptionObj
  if(QuestionOptionObj.id!=this.check){
    this.AddOrUpdate="update Multi-Choice Questions"
  }

}
deleteQuestionOption(QuestionOptionId:number){
  console.log(QuestionOptionId,"QuestionOptionId")
  this.QuestionOptionsService.DeleteQuestionsOption(QuestionOptionId).subscribe(
    data=>{
      console.log("QuestonOption Delete",data)
      window.location.href='/DashBoard/QuestionOptiones'
    }
  )
}
}
