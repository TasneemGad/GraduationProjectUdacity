
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { ILogin } from '../SharedModels/Interface/ILogin';
import { IAccount } from '../SharedModels/Interface/iaccount';
import { AuthenticationService } from './authentication.service';

const URL="https://localhost:44326/api/Account";

const URL_Update="https://localhost:44326/api/Account/UpdateUserName";                 
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
//Update UserName
 UpdateStdName(userName:string,stID:string){     
  this.stID=this.token.getUserId();
  stID=this.stID;
  this.getStudentInformation(stID).subscribe(
    data=>{
      data.userName=userName  
      return this.http.put(`${URL_Update}/${data.id}`, data).pipe(catchError((err) => {
        return throwError(err.message || "error")
        }))
        
    }
  )
   }

  updatePassword(newPassword:string){
    this.stID=this.token.getUserId();
    return this.http.put(URL+"/"+this.stID+"/"+newPassword,this.getStudentInformation(this.stID)).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
}

