import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lesson} from '../SharedModels/Interface/ILessonContent';

@Injectable({
  providedIn: 'root'
})
export class LessonContentService {
    lessonUrl="https://localhost:44326/api/lessonContent"
    constructor(private http: HttpClient) { }

    GetAllLessonContent(): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(this.lessonUrl).pipe(catchError((err)=>{
          return throwError(err.massage || "Error")}))
      }
    
      GetLessonContentById(id:number){
        return this.http.get<Lesson[]>(this.lessonUrl+"/" + id).pipe();
      }
}