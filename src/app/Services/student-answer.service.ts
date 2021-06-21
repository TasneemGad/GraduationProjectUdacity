import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAnswer } from '../SharedModels/Interface/StudentAnswer';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerService {
StudentAnswerUrl="https://localhost:44326/api/StudentAnswer"
StudentAnswerLessonContentUrl="https://localhost:44326/api/StudentAnswer/GetAllStudentAnswersByLessonContent/"

  constructor(private http:HttpClient,private token:AuthenticationService) { }
  getAllStudentAnswer():Observable<StudentAnswer[]>{
    return this.http.get<StudentAnswer[]>(this.StudentAnswerUrl).pipe()
   }
   getStudentAnswerById(id:number):Observable<StudentAnswer>{
     return this.http.get<StudentAnswer>(this.StudentAnswerUrl+"/"+id).pipe()
    }
    PostStudentAnswer(Answer:StudentAnswer):Observable<StudentAnswer[]>{
      return this.http.post<StudentAnswer[]>(this.StudentAnswerUrl,Answer).pipe()
     }
    getStudentAnswerByLessonContent(id:number):Observable<StudentAnswer[]>{
     console.log("second")
     return this.http.get<StudentAnswer[]>(this.StudentAnswerLessonContentUrl+id+"/"+this.token.getUserId()).pipe()
    }
}
