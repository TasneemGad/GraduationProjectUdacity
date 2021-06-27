import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../SharedModels/Interface/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  Url ="https://localhost:44326/api/Category"

  constructor(private _http : HttpClient) { }

  getCategories():Observable<ICategory[]> {
    return this._http.get<ICategory[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))  
  }

  //add
  insertCategory(Category:ICategory):Observable<ICategory[]> {
    return this._http.post<ICategory[]>(this.Url,Category).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))  
  }

  //update
  updateCategory(catId:number,Category:ICategory):Observable<ICategory[]> {
    return this._http.put<ICategory[]>(this.Url+"/"+catId,Category).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))  
  }

  //delete
  deleteCategory(catId:number):Observable<ICategory[]> {
    return this._http.delete<ICategory[]>(this.Url+"/"+catId).pipe(catchError((err)=>{
      return throwError(err.massage || "Error")
  }))  
  }

  getCategoryById(id:number):Observable<ICategory>{
    let url = `${this.Url}/${id}`;
    return this._http.get<ICategory>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getCategoryByName(name:string):Observable<ICategory>{
    let url = `https://localhost:44326/school-of/${name}`;
    return this._http.get<ICategory>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));}
 
}
