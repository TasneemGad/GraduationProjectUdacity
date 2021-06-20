import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LessonContentComponent } from '../Component/lectures&Lesson/lesson-content/lesson-content.component';
import { Lesson } from '../SharedModels/Interface/ILesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  lessonUrl="https://localhost:44326/api/Lesson"
  lessonUrl2="https://localhost:44326/api/Lesson/LessonByLec/"
  constructor(private http: HttpClient) { }

  GetAllLesson(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.lessonUrl).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }

  GetLessonById(id:number){
    return this.http.get<Lesson>(this.lessonUrl+"/" + id).pipe();
  }

  GetAllLessonByLectureId(id:number){
    return this.http.get<Lesson[]>(this.lessonUrl2+id).pipe();
  }
  GetAllLessonByCrsID(crsId:number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.lessonUrl+"/LessonByCrsID/"+crsId).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }
}
