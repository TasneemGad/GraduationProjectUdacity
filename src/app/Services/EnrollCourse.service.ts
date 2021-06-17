import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEnrollCourse } from '../SharedModels/Interface/IEnrollCourse';
import {AuthenticationService } from '../Services/authentication.service';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { analyzeAndValidateNgModules } from '@angular/compiler';


const API_URL = 'https://localhost:44326/api/EnrollCourse'
// let params =  new HttpParams().set { 'X-MyHeader': 'k6test' } 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),}
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
  id:number;
  x:any="1"

  // enrolledcrs:IEnrollCourse={id:0,courseId:0,studentId:"",endEnrollDate:"",enrollDate:""};


  Url:string="https://localhost:44326/api/EnrollCourse"

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
 Unenroll(id:number):Observable<any>{
 return  this.http.delete('http://localhost:44326/api/EnrollCourse/'+id,httpOptions)
  //  .toPromise().then(res=>this.trueenroll=res as IEnrollCourse[])

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
  getStdEnrollcrs(crsID:number): Observable<IEnrollCourse>{    
    this.stdId= this.tokenUser.getUserId();
     return this.http.get<IEnrollCourse>("https://localhost:44326/api/EnrollCourse/EnrollCrs"+"/"+crsID+"/" + this.stdId).pipe(catchError((err) => {
       return throwError(err.message || "error")
     }))
   }
  //RemoveCourse
<<<<<<< HEAD
  RemoveEnrollCourse(crsId:number):Observable<IEnrollCourse>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':'token'}),
      // body: {id: crsId} 
    };
    console.log("Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    // this.getStdEnrollcrs(crsId).subscribe(
    //   data=>{
    //     this.enrollCrsId=data.id;
    //     console.log("gg",this.enrollCrsId)
    //   });
      let x= this.http.delete<IEnrollCourse>("https://localhost:44326/api/EnrollCourse/ "+crsId)
    //   .pipe(catchError((err) => {
    //   return throwError(err.message || "error")
    // }))
  //   console.log("x",x)
   return x
}
refreshList() {
  this.http.get(API_URL)
    // .toPromise()
    // .then(res =>this.coursesList = res as ICourse[]);
}


=======
  RemoveEnrollCourse(crsId:number):Observable<any>{    
    console.log("Here---------")
    this.getStdEnrollcrs(crsId).subscribe(
      data=>{  
        console.log(data)
        
        this.x=this.http.delete<any>("https://localhost:44326/api/EnrollCourse/" + data.id,httpOptions)
        // "https://localhost:44326/api/EnrollCourse/Test"+"/" + data.id).pipe(catchError((err) => {
        //   return throwError(err.message || "error")
        //}))

      }
    );
        console.log(this.x)
        return this.x;

 }
//     return this.http.delete("https://localhost:44326/api/EnrollCourse/8")
//         .pipe(catchError((err) => {
//           console.log("err",err)
//               return throwError(err.message || "error")
//             }))
// }
>>>>>>> af8b9068204aecee0140020db0bf075b31f725d2
}