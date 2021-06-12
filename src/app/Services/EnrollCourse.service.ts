import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEnrollCourse } from '../SharedModels/Interface/IEnrollCourse';
import {AuthenticationService } from '../Services/authentication.service';
import { ICourse } from '../SharedModels/Interface/ICourses';


const API_URL = 'https://localhost:44326//api/EnrollCourse'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  coursesList: ICourse[]=[];      
  newenroll:IEnrollCourse;
  enrolled:IEnrollCourse[]=[];
  trueenroll:IEnrollCourse[]=[]
  stdId:string|null=""
  result:string|null="";

  constructor(private http:HttpClient,public tokenUser:AuthenticationService) { }

  getAllEnrollCourses(){

    return this.http.get(API_URL).toPromise().then(res=>this.coursesList =res as ICourse[]);

 }
 getStsEnrollCourse(){
   this.stdId=window.sessionStorage.getItem("auth-userID")
  if(this.stdId!=null)
  {
       this.result =  this.stdId.substring(1, this.stdId.length-1);    
  }
  return this.http.get(API_URL+"?stdID="+this.result).toPromise().then(res=>this.trueenroll=res as IEnrollCourse[])     
 }
 Unenroll(id:number){
   this.http.delete('http://localhost:44326/api/EnrollCourse/{id}/'+id).toPromise().then(res=>this.trueenroll=res as IEnrollCourse[])

 }
  EnrollInCourse(courseid:number): Observable<any>
  {
   this.newenroll.studentId= this.tokenUser.getUserId();
   this.newenroll.courseId=courseid;
   this.newenroll.enrollDate;
   this.newenroll.endEnrollDate;
   console.log("--------------------")   
   console.log(this.newenroll)

    return this.http.post('http://localhost:44326/api/EnrollCourse' ,this.newenroll,httpOptions);
  }

  getAllStdEnrolledCourses(): Observable<IEnrollCourse[]>{
   this.stdId= this.tokenUser.getUserId();
    return this.http.get<IEnrollCourse[]>("https://localhost:44326/AllStdEnrollCourses"+"/" + this.stdId).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
 
}
