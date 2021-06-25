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

  AddNewTrueAndFalseQuestions(TrueAndFalse:ITrueAndFalse): Observable<ITrueAndFalse> {
    return this._http.post<ITrueAndFalse>(this.Url,TrueAndFalse).pipe(catchError((err)=>{
      return throwError(err.message || "Invaled Registration")
    }))
  }
   DeleteTrueAndFalseQuestions(id:number):Observable<any>{
    let url = `${this.Url}/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  
  }
    PutTrueAndFalseQuestions(id:number, TrueAndFalseToUpdate:ITrueAndFalse):Observable<ITrueAndFalse>{
      let url = `${this.Url}/${id}`;
      return this._http.put<ITrueAndFalse>(url, TrueAndFalseToUpdate)
              .pipe(catchError((err)=>{
                return throwError(err.message ||"Internal Server error contact site adminstarator");
                  }
                ));
  
    }
}
