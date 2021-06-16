import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LessonContent} from '../SharedModels/Interface/ILessonContent';

@Injectable({
  providedIn: 'root'
})
export class LessonContentService {
    lessonContentUrl="https://localhost:44326/api/lessonContent"
    constructor(private http: HttpClient) { }

    GetAllLessonContent(): Observable<LessonContent[]> {
        return this.http.get<LessonContent[]>(this.lessonContentUrl).pipe(catchError((err)=>{
          return throwError(err.massage || "Error")}))
      }
    
      GetLessonContentById(id:number){
        return this.http.get<LessonContent[]>(this.lessonContentUrl+"/" + id).pipe();
      }
}