import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lessons } from '../SharedModels/Interface/ILessons';
@Injectable({
  providedIn: 'root'
})
export class LessonService {
 getUrl="https://localhost:44326/api/Lesson"
  constructor(private http:HttpClient) { }

  getAllLessons():Observable<Lessons[]>{
    return  this.http.get<Lessons[]>(this.getUrl).pipe()
  }
  getLessonsById(LessonId:number):Observable<Lessons[]>{
    return  this.http.get<Lessons[]>(this.getUrl+"/" + LessonId).pipe()
  }
}
