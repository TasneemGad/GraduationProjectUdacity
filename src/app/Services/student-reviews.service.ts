import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IReviews } from '../SharedModels/Interface/IReviews';

@Injectable({
  providedIn: 'root'
})
export class StudentReviewsService {

  Url ="https://localhost:44326/api/StudentReviews"

  constructor(private _http : HttpClient) { }

  getReviews():Observable<IReviews[]> {
    return this._http.get<IReviews[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))

  }
}
