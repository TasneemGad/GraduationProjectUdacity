import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../SharedModels/Interface/ICategory';
import { ICourse } from '../SharedModels/Interface/ICourses';

@Injectable({
  providedIn: 'root'
})
export class TwoCoursesSuggestService {

  Url ="https://localhost:44326/GetTopTwoCrs/"

  constructor(private _http : HttpClient) { }

  getTwoCourses(catID:number):Observable<ICourse[]> {
    return this._http.get<ICourse[]>(this.Url+catID).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))

  }
}
