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

  // login(username: string, PasswordHash: string) {
  //   return this._http.post<any>(this.UrlLogin, { username, PasswordHash })
  //       .pipe(map(res => {
  //           this.setSession(res);
  //       }));

//}

}
