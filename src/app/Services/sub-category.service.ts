import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../SharedModels/Interface/ICourses';
import { ISubCategory } from '../SharedModels/Interface/ISubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  Url ="https://localhost:44326/api/SubCategory"
  SubUrlId ="https://localhost:44326/api/SubCategory/"

  constructor(private _http : HttpClient) { }
  getAllSubCategory():Observable<ISubCategory[]> {
    return this._http.get<ISubCategory[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }
  getSubCategoryById(id:number):Observable<ISubCategory> {
    return this._http.get<ISubCategory>(this.SubUrlId+id).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }


  postSubCategory(subCat:ISubCategory): Observable<ISubCategory> {
    console.log("subadd1")
    return this._http.post<ISubCategory>(this.Url,subCat)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }

  UpdateSubCategory(id:number ,update:ISubCategory): Observable<ISubCategory> {
    console.log("update")
    return this._http.put<ISubCategory>(this.SubUrlId+id,update ).pipe();
  }

  deleteSubCategory(id:number): Observable<ISubCategory> {
    console.log("delete1")
    return this._http.delete<ISubCategory>(this.SubUrlId+id)
    .pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }

}
