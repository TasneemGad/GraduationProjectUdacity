import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lectures } from '../SharedModels/Interface/ILectures';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {
  lectureUrl="https://localhost:44326/api/lecture"
  lectureUrlID="https://localhost:44326/api/lecture/"
  getLectureUrl="https://localhost:44326/api/lecture/GetAllCrsLectures?CrsID="
  constructor(private http: HttpClient) { }

  getAllLectures(): Observable<Lectures[]> {
    console.log("ser1")
    return this.http.get<Lectures[]>((this.lectureUrl)).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }

  getLecturesByCoursID(crsId: number): Observable<Lectures[]> {    
    return this.http.get<Lectures[]>(this.getLectureUrl + crsId).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }
    
  getLecturesByID(id: any): Observable<Lectures> {
    return this.http.get<Lectures>(this.lectureUrlID+ id ).pipe();
  }

  postLectures(lecture:Lectures): Observable<Lectures> {
    console.log("ser1")
    return this.http.post<Lectures>(this.lectureUrl,lecture)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }

  UpdateLectures(id:number ,update:Lectures): Observable<Lectures> {
    return this.http.put<Lectures>(this.lectureUrl+"/"+id,update ).pipe();
  }

  deleteLectures(id:number): Observable<Lectures> {
    console.log("ser1")
    return this.http.delete<Lectures>(this.lectureUrlID+id)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }


}
