import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { IwatchContent } from '../SharedModels/Interface/iwatchcontent';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WatchService {
  Url="https://localhost:44326/api/Watched"

  constructor(private http:HttpClient,private token:AuthenticationService) { }

  insertWatch(watchcontent:IwatchContent):Observable<IwatchContent>{
    return this.http.post<IwatchContent>(this.Url,watchcontent).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

  getWatch(crsId:number,lessonContentid:number):Observable<any>{
    return this.http.get("https://localhost:44326/CheckIfExist/"+this.token.getUserId()+"/"+crsId+"/"+lessonContentid).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

}
