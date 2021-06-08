import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IStudentStory } from '../SharedModels/Interface/IStudentStory';

@Injectable({
  providedIn: 'root'
})
export class StudentStoriesService {

  Url ="https://localhost:44326/api/StudentStories"

  constructor(private _http : HttpClient) { }

  getStudentStory():Observable<IStudentStory[]> {
    return this._http.get<IStudentStory[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))

  }
}