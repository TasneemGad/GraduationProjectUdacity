import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuestionGroup } from '../SharedModels/Interface/IQuestionGroup';

@Injectable({
  providedIn: 'root'
})
export class QuestionsGroupService {
  QuestionsGroupUrls="https://localhost:44326/api/QuestionGroup"
  constructor(private http:HttpClient) { }
  getAllQuestionsGroup():Observable<QuestionGroup[]>{
   return this.http.get<QuestionGroup[]>(this.QuestionsGroupUrls).pipe()
  }
  getQuestionsGroupById(id:number):Observable<QuestionGroup>{
    return this.http.get<QuestionGroup>(this.QuestionsGroupUrls+"/"+id).pipe()
   }
   //insert
   insertQuestionGroup(QuestionGroup:QuestionGroup): Observable<QuestionGroup> {
    return this.http.post<QuestionGroup>(this.QuestionsGroupUrls,QuestionGroup).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }
  //delete
  deleteQuestionGroup(QuestionGroupID:number): Observable<QuestionGroup> {
    return this.http.delete<QuestionGroup>(this.QuestionsGroupUrls+"/"+QuestionGroupID).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }
  //update
  updateQuestionGroup(QuestionGroupID:number,questionGroup:QuestionGroup): Observable<QuestionGroup> {
    return this.http.put<QuestionGroup>(this.QuestionsGroupUrls+"/"+QuestionGroupID,questionGroup).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }
  getQuestionGroupList(crsId:number,lectId:number,lessonId:number):Observable<QuestionGroup[]>{
    return this.http.get<QuestionGroup[]>(this.QuestionsGroupUrls+"/QuestionGroupsByIds/"+crsId+"/"+lectId+"/"+lessonId).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }
}
