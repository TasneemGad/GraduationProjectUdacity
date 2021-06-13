import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { Lessons } from '../SharedModels/Interface/ILessons';
=======
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LessonContentComponent } from '../Component/lectures&Lesson/lesson-content/lesson-content.component';
import { Lesson } from '../SharedModels/Interface/ILesson';

>>>>>>> af4038c184751b261dbe63cac0f592f8621296bf
@Injectable({
  providedIn: 'root'
})
export class LessonService {
<<<<<<< HEAD
 getUrl="https://localhost:44326/api/Lesson"
  constructor(private http:HttpClient) { }

  getAllLessons():Observable<Lessons[]>{
    return  this.http.get<Lessons[]>(this.getUrl).pipe()
  }
  getLessonsById(LessonId:number):Observable<Lessons[]>{
    return  this.http.get<Lessons[]>(this.getUrl+"/" + LessonId).pipe()
=======
  lessonUrl="https://localhost:44326/api/Lesson"
  constructor(private http: HttpClient) { }

  GetAllLesson(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.lessonUrl).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")}))
  }

  GetLessonById(id:number){
    return this.http.get<Lesson[]>(this.lessonUrl+"/" + id).pipe();
>>>>>>> af4038c184751b261dbe63cac0f592f8621296bf
  }
}
