<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMonterOrInstractor } from '../SharedModels/Interface/IMonterOrInstractor';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService } from '../Services/authentication.service';
import { IMentorOrInstractor } from '../SharedModels/Interface/imentororinstractor';


const API_URL = 'https://localhost:44326/api/MentorOrInstractorStories'
>>>>>>> 556ea4f94c966695972a3411eba01c8bd6a542c0

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class MentorOrInstractorService {

  Url ="https://localhost:44326/api/MentorOrInstractorStories"

  constructor(private _http : HttpClient) { }

  getInstractor():Observable<IMonterOrInstractor[]> {
    return this._http.get<IMonterOrInstractor[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))
  }
  
=======

export class MentorOrInstractorService {

  constructor(private http:HttpClient,public tokenUser:AuthenticationService) {}
  getAllInstracor():Observable<IMentorOrInstractor[]> {
    return this.http.get<IMentorOrInstractor[]>(API_URL+"/InstractorsStories")    
 }
 getAllMentor():Observable<IMentorOrInstractor[]> {
  return this.http.get<IMentorOrInstractor[]>(API_URL+"/MentorStories")    
}
 
>>>>>>> 556ea4f94c966695972a3411eba01c8bd6a542c0
}
