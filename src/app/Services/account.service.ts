import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { ILogin } from '../SharedModels/Interface/ILogin';

const URL="https://localhost:44326/api/Account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getStudentName(id:string){
    return this.http.get<ILogin>(URL+"/"+id).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
}
