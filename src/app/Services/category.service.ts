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
}
