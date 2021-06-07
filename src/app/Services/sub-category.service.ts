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

  constructor(private _http : HttpClient) { }

  getSubCategory():Observable<ISubCategory[]> {
    return this._http.get<ISubCategory[]>(this.Url).pipe(catchError((err)=>{
      return throwError(err.message || "error")
    }))
  }}
