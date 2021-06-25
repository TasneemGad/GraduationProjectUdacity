import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from '../SharedModels/Interface/IQestions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  QuestionsUrls="https://localhost:44326/api/Question"
  constructor(private http:HttpClient) { }
  QByLessonContent="https://localhost:44326/api/Question/QuestionByLessonContent/"
QOption="https://localhost:44326/api/Question/"
  getAllQuestions():Observable<Question[]>{
   return this.http.get<Question[]>(this.QuestionsUrls).pipe()
  }
  getQuestionsById(id:number):Observable<Question>{
    return this.http.get<Question>(this.QuestionsUrls+"/"+id).pipe()
   }
   getQuestionsByLessonContent(id:number):Observable<Question[]>{
    console.log("second")
    return this.http.get<Question[]>(this.QByLessonContent+id).pipe()
   }

    getQuestionsByType(Type:string):Observable<Question[]>{
    return this.http.get<Question[]>(this.QOption+"QstTypeList/"+Type).pipe()
   }
   //insertQuestion
   insertQuestion(question:Question):Observable<Question>
   { 
     return this.http.post<Question>(this.QuestionsUrls,question).pipe(catchError((err)=>{
     return throwError(err.massage || "Error")}))
   }
   //deleteQuestion
   deleteQuestion(questionID:number):Observable<Question>
   { 
     return this.http.delete<Question>(this.QuestionsUrls+"/"+questionID).pipe(catchError((err)=>{
     return throwError(err.massage || "Error")}))
   }
   //updateQuestion
   updateQuestion(questionID:number,question:Question):Observable<Question>
   { 
     return this.http.put<Question>(this.QuestionsUrls+"/"+questionID,question).pipe(catchError((err)=>{
     return throwError(err.massage || "Error")}))
   }
   //GetAllQuestionbyIds
   GetAllQuestionbyIds(lessonContentId:number,questionGroupId:number):Observable<Question[]>
   { 
     return this.http.get<Question[]>(this.QuestionsUrls+"/GetAllQuestionbyIds/"+lessonContentId+"/"+questionGroupId).pipe(catchError((err)=>{
     return throwError(err.massage || "Error")}))
   }
}
