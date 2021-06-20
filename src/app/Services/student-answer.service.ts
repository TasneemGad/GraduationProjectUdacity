import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAnswer } from '../SharedModels/Interface/StudentAnswer';

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerService {
StudentAnswerUrl="https://localhost:44326/api/StudentAnswer/GetAllStudentAnswersByLessonContent"
StudentAnswerLessonContentUrl="https://localhost:44326/api/StudentAnswer/GetAllStudentAnswersByLessonContent/"

  constructor(private http:HttpClient) { }
  getAllStudentAnswer():Observable<StudentAnswer[]>{
    return this.http.get<StudentAnswer[]>(this.StudentAnswerUrl).pipe()
   }
   getStudentAnswerById(id:number):Observable<StudentAnswer>{
     return this.http.get<StudentAnswer>(this.StudentAnswerUrl+"/"+id).pipe()
    }
    getStudentAnswerByLessonContent(id:number):Observable<StudentAnswer[]>{
     console.log("second")
     return this.http.get<StudentAnswer[]>(this.StudentAnswerLessonContentUrl+id).pipe()
    }
}