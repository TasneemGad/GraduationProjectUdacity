import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMonterOrInstractor } from '../SharedModels/Interface/IMonterOrInstractor';

@Injectable({
  providedIn: 'root'
})
export class MentorOrInstractorService {

  Url ="https://localhost:44326/api/MentorOrInstractorStories"

  constructor(private _http : HttpClient) { }

  getInstractor():Observable<IMonterOrInstractor[]> {
    return this._http.get<IMonterOrInstractor[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))
  }
  
}
