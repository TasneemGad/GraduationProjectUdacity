import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMonterOrInstractor } from '../SharedModels/Interface/IMonterOrInstractor';
import {AuthenticationService } from '../Services/authentication.service';
import { IMentorOrInstractor } from '../SharedModels/Interface/imentororinstractor';

const API_URL = 'https://localhost:44326/api/MentorOrInstractorStories'

@Injectable({
  providedIn: 'root'
})
export class MentorOrInstractorService {

  Url ="https://localhost:44326/api/MentorOrInstractorStories"

  constructor(private http:HttpClient,public tokenUser:AuthenticationService) {}


  getInstractor():Observable<IMonterOrInstractor[]> {
    return this.http.get<IMonterOrInstractor[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))
  }


  getTopFourInstracor():Observable<IMonterOrInstractor[]> {
    return this.http.get<IMonterOrInstractor[]>(this.Url+"/TopFourInstStories").pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))
  }
  getAllInstracor():Observable<IMentorOrInstractor[]> {
    return this.http.get<IMentorOrInstractor[]>(API_URL+"/InstractorsStories")    
 }

 
 getAllMentor():Observable<IMentorOrInstractor[]> {
  return this.http.get<IMentorOrInstractor[]>(API_URL+"/MentorStories")    
}
 
}
