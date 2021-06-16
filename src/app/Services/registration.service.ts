import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ILogin } from '../SharedModels/Interface/ILogin';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  UrlRegister ="https://localhost:44326/Register"
  UrlLogin ="https://localhost:44326/Login"
  apiUrl="https://localhost:44326"
  constructor(private _http : HttpClient) { }

  SignUp(newUser: ILogin): Observable<ILogin> {
    return this._http.post<ILogin>(this.UrlRegister,newUser).pipe(catchError((err)=>{
      return throwError(err.message || "Invaled Registration")
    }))
  }

  SignIn(User: ILogin): Observable<ILogin> {
    console.log("entered")
    return this._http.post<ILogin>(this.UrlLogin, User).pipe(catchError((err)=>{
      
    return throwError(err.message || "Invaled Email or Password")
  }))
  }

  getUserById(id: string): Observable<ILogin> {
    let url = `${this.apiUrl}/api/account/${id}`;
    return this._http.get<ILogin>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  getCurrentUser(): Observable<ILogin> {
    let url = `${this.apiUrl}/api/account/current`;
    return this._http.get<ILogin>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

}
