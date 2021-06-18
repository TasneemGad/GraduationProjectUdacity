import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DragAndDrop } from '../SharedModels/Interface/Drag&&Drop';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
DragAndDropUrl="https://localhost:44326/api/DragAndDrop"
  constructor(private http:HttpClient) { }

 getAllQuestion():Observable<DragAndDrop[]>{
  return this.http.get<DragAndDrop[]>(this.DragAndDropUrl).pipe();
 }
 getQuestionById(id:number):Observable<DragAndDrop>{
  return this.http.get<DragAndDrop>(this.DragAndDropUrl+"/"+id).pipe();
 }

}
