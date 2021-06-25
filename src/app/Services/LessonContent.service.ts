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
    lessonContentUrlId="https://localhost:44326/api/lessonContent/"  
    lessonContentByLesson="https://localhost:44326/api/lessonContent/LessonContentByLes/"
    
    constructor(private http: HttpClient) { }

    GetAllLessonContent(): Observable<LessonContent[]> {
        return this.http.get<LessonContent[]>(this.lessonContentUrl).pipe(catchError((err)=>{
          return throwError(err.massage || "Error")}))
      }

//LessonContentByCrsID

    GetAllLessonContentByCrsID(crsId:number): Observable<LessonContent[]> {
      return this.http.get<LessonContent[]>(this.lessonContentUrl+"/LessonContentByCrsID/"+crsId).pipe(catchError((err)=>{
        return throwError(err.massage || "Error")}))
    }

    GetLessonContentById(id:number): Observable<LessonContent>{
        console.log("d")
        return this.http.get<LessonContent>(this.lessonContentUrl+"/" + id).pipe();
      }
    GetLessonContentByLesson(id:number):Observable<LessonContent[]>{
        return this.http.get<LessonContent[]>(this.lessonContentByLesson+id).pipe();
      }
    getLessonContentCount(crsid:number):Observable<any>{
        return this.http.get(this.lessonContentUrl+"/CrsLessonContentCount/"+crsid).pipe(catchError((err)=>{
          return throwError(err.massage || "Error")
        }))
      } 
      
      AddNewLessonContent(newLessonContent: LessonContent): Observable<LessonContent> {
        return this.http.post<LessonContent>(this.lessonContentUrl,newLessonContent).pipe(catchError((err)=>{
          return throwError(err.message || "Invaled Registration")
        }))
      }
    postLessonContent(lessonContent:LessonContent): Observable<LessonContent> {
    console.log("ser1")
    return this.http.post<LessonContent>(this.lessonContentUrl,lessonContent)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
      }
    UpdateLessonContent(id:number ,update:LessonContent): Observable<LessonContent> {
    return this.http.put<LessonContent>(this.lessonContentUrlId+id,update ).pipe();
      }
    deleteLessonContent(id:number): Observable<LessonContent> {
    console.log("ser1")
    return this.http.delete<LessonContent>(this.lessonContentUrlId+id)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
      }


}