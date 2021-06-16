
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { ILogin } from '../SharedModels/Interface/ILogin';
import { IAccount } from '../SharedModels/Interface/iaccount';
import { AuthenticationService } from './authentication.service';

const URL="https://localhost:44326/api/Account";

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

  getStudentInformation(id:string){
    return this.http.get<IAccount>(URL+"/"+id).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

 UpdateStdName(userName:string){     
  this.stID=this.token.getUserId();

  console.log(this.stID)
  console.log(userName)

    return this.http.put(URL+"UpdateUserName/"+this.stID+"/"+userName,this.getStudentInformation(this.stID)).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

  updatePassword(newPassword:string){
    this.stID=this.token.getUserId();
    return this.http.put(URL+"UpdateUserName/"+this.stID+"/"+newPassword,this.getStudentInformation(this.stID)).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
}

