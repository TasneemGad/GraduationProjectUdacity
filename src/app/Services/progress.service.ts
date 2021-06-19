import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { IProgress } from '../SharedModels/Interface/iprogress';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  Url = "https://localhost:44326/api/Progress"

  constructor(private token:AuthenticationService,private http:HttpClient) { }

  UpdateLessonContentProgress(progress:IProgress,ProgressId:number):Observable<IProgress>{
     return this.http.put<IProgress>(this.Url+"/"+ProgressId,progress).pipe(catchError((err) => {
    return throwError(err.message || "error")
  }))
  }

  insertLessonContentProgress(progress:IProgress):Observable<IProgress>{
    return this.http.post<IProgress>(this.Url,progress).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
  getLessonContentProgress(crsId:string):Observable<IProgress>{    
    return this.http.get<IProgress>(this.Url+"/progress/"+this.token.getUserId()+"/"+crsId).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

}

