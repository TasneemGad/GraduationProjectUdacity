import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  Url = "https://localhost:44326/api/Course"
  URLCrsCat = "https://localhost:44326/CourseByCategory"
  AdminCourse:ICourse={name:"",description:"",partLogo:"",preRequest:"",price:0,lectureNumber:0,crsLogo:"",discount:0,duration:0,type:"",subCategoryId:0,categoryId:0,id:0}

  constructor(private _http: HttpClient) { }

  getCourses(): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.Url).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
  // getCoursess(): Observable<ICourse> {
  //   return this._http.get<ICourse>(this.Url).pipe(catchError((err) => {
  //     return throwError(err.message || "error")
  //   }))
  // }
  getCoursesByID(id: number): Observable<ICourse> {
    return this._http.get<ICourse>(this.Url + "/" + id).pipe(catchError((err) => { return throwError(err.message || "error") }))
  }
  //Get All coourses by category id
  getCoursesByCatID(catid: any): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.URLCrsCat + "/" + catid).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
//UpdateCrs
  updateCourses(crsid: number,course:ICourse): Observable<ICourse[]> {
    return this._http.put<ICourse[]>(this.Url + "/" + crsid,course).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

  //insertCrs
  insertCourses(course:ICourse): Observable<ICourse[]> {
    return this._http.post<ICourse[]>(this.Url,course).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
  //delete

 deleteCourses(courseId:number): Observable<ICourse[]> {
    return this._http.delete<ICourse[]>(this.Url+"/"+courseId).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

}
