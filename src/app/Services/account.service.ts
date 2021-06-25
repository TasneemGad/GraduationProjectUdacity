import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { ILogin } from '../SharedModels/Interface/ILogin';
import { IAccount } from '../SharedModels/Interface/iaccount';
import { AuthenticationService } from './authentication.service';

const URL="https://localhost:44326/api/Account";

const URL_Update="https://localhost:44326/api/Account/UpdateUserInfo/";                 
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account:IAccount;
  stID:string;
  
  constructor(private http: HttpClient,private  token:AuthenticationService) { }

  getStudentName(id:string){
    return this.http.get<ILogin>(URL+"/"+id).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

  getStudentInformation(id:string):Observable<IAccount>{
    return this.http.get<IAccount>(URL+"/"+id).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

 UpdateStInfo(account:IAccount):Observable<any>{    
  this.stID=this.token.getUserId();  
  console.log("acccccccccc",account)
  return this.http.put(URL_Update+this.stID, account ).pipe(catchError((err) => {
    
    return throwError(err.message || "error")
    
    }))
   }

  updatePassword(account:IAccount,oldPasswordHashed:string):Observable<any>{
    this.stID=this.token.getUserId();
    return this.http.put(URL+"/updatePassword/"+this.stID+"/"+oldPasswordHashed,account).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
}

