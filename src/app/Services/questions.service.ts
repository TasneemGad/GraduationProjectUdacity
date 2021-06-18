import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../SharedModels/Interface/IQestions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  QuestionsGroupUrls="https://localhost:44326/api/QuestionGroup"
  constructor(private http:HttpClient) { }
  
  getAllQuestions():Observable<Question[]>{
   return this.http.get<Question[]>(this.QuestionsGroupUrls).pipe()
  }


  getQuestionsById(id:number):Observable<Question>{
    return this.http.get<Question>(this.QuestionsGroupUrls+"/"+id).pipe()
   }
}
