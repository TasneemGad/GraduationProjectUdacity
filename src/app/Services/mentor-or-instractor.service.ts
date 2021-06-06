import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService } from '../Services/authentication.service';
import { IMentorOrInstractor } from '../SharedModels/Interface/imentororinstractor';


const API_URL = 'https://localhost:44326/api/MentorOrInstractorStories'

@Injectable({
  providedIn: 'root'
})

export class MentorOrInstractorService {

  constructor(private http:HttpClient,public tokenUser:AuthenticationService) {}
  getAllInstracor():Observable<IMentorOrInstractor[]> {
    return this.http.get<IMentorOrInstractor[]>(API_URL+"/InstractorsStories")    
 }
 getAllMentor():Observable<IMentorOrInstractor[]> {
  return this.http.get<IMentorOrInstractor[]>(API_URL+"/MentorStories")    
}
 
}
