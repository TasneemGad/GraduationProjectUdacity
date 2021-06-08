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
  getLectureUrl="https://localhost:44326/api/lecture/GetAllCrsLectures"
  constructor(private http: HttpClient) { }

  getAllLectures(): Observable<Lectures[]> {
    console.log("ser1")
    return this.http.get<Lectures[]>((this.lectureUrl)).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }
  getLecturesByID(id: number): Observable<Lectures[]> {
    let x= this.http.get<Lectures[]>(this.getLectureUrl + "?CrsID=" + id).pipe();
    console.log(x)
    return x
  }
}