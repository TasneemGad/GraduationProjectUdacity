import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionGroup } from '../SharedModels/Interface/IQuestionGroup';

@Injectable({
  providedIn: 'root'
})
export class QuestionsGroupService {
  QuestionsGroupUrls="https://localhost:44326/api/Question"
  constructor(private http:HttpClient) { }
  getAllQuestionsGroup():Observable<QuestionGroup[]>{
   return this.http.get<QuestionGroup[]>(this.QuestionsGroupUrls).pipe()
  }
  getQuestionsGroupById(id:number):Observable<QuestionGroup>{
    return this.http.get<QuestionGroup>(this.QuestionsGroupUrls+"/"+id).pipe()
   }
}
