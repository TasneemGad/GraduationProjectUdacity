import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ICourse } from '../SharedModels/Interfaces/ICourse';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  Url ="https://localhost:44326/api/Course"

  constructor(private _http : HttpClient) { }

  getCourses():Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.message || "Error")
    }))
  }
}
