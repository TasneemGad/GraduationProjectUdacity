import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IReviews } from '../SharedModels/Interface/IReviews';
import { ITrueAndFalse } from '../SharedModels/Interface/ITrueAndFalse';

@Injectable({
  providedIn: 'root'
})
export class TrueAndFalseService {

  Url ="https://localhost:44326/api/TrueAndFalse"

  constructor(private _http : HttpClient) { }

  getReviews():Observable<ITrueAndFalse[]> {
    return this._http.get<ITrueAndFalse[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))

  }
}
