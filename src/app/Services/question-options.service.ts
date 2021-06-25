import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    console.log("ccqid")

    return this.http.get<QOptions>(this.QuestionsOptionUrls+"/GetQuestionOptByQuestionID/"+QID).pipe()
   }

   AddNewQuestionsOption(options:QOptions): Observable<QOptions> {
    return this.http.post<QOptions>(this.QuestionsOptionUrls,options).pipe(catchError((err)=>{
      return throwError(err.message || "Invaled Registration")
    }))
  }
   DeleteQuestionsOption(id:number):Observable<any>{
    let url = `${this.QuestionsOptionUrls}/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  
  }
    PutQuestionsOption(id:number, QOptionsToUpdate:QOptions):Observable<QOptions>{
      let url = `${this.QuestionsOptionUrls}/${id}`;
      return this.http.put<QOptions>(url, QOptionsToUpdate)
              .pipe(catchError((err)=>{
                return throwError(err.message ||"Internal Server error contact site adminstarator");
                  }
                ));
  
    }
   
}
