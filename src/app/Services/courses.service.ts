import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  Url ="https://localhost:44326/api/Course"
  URLCrsCat="https://localhost:44326/CourseByCategory"

  constructor(private _http : HttpClient) { }

  getCourses():Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }
<<<<<<< HEAD
  getCoursess():Observable<ICourse> {
    return this._http.get<ICourse>(this.Url).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }
  getCoursesByID(id:number):Observable<ICourse> {
    return this._http.get<ICourse>(this.Url+"/"+id).pipe(catchError((err)=>{
=======
//Get All coourses by category id
  getCoursesByCatID(catid:any):Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.URLCrsCat+"/"+catid).pipe(catchError((err)=>{
>>>>>>> 496c07c388fc206a5f730c262e70be8833a29d17
      return throwError(err.message || "error")
    }))
  }
}
