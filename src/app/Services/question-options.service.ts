import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QOptions } from '../SharedModels/Interface/QuestionOtions';

@Injectable({
  providedIn: 'root'
})
export class QuestionOptionsService {
  QuestionsOptionUrls="https://localhost:44326/api/QuestionOptions"
  constructor(private http:HttpClient) { }
  // QByLessonContent="https://localhost:44326/api/Question/QuestionByLessonContent/"

  getAllQuestionsOption():Observable<QOptions[]>{
   return this.http.get<QOptions[]>(this.QuestionsOptionUrls).pipe()
  }
  getQuestionsOptionById(id:number):Observable<QOptions>{
    return this.http.get<QOptions>(this.QuestionsOptionUrls+"/"+id).pipe()
   }

   getQuestionsOptionByQuestionId(QID:number):Observable<QOptions>{
    return this.http.get<QOptions>(this.QuestionsOptionUrls+"/GetQuestionOptByQuestionID/"+QID).pipe()
   }

   PostQuestionsOption(options:QOptions):Observable<QOptions>{
    return this.http.post<QOptions>(this.QuestionsOptionUrls,options).pipe()
   }
   
}
