import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseVideos } from '../SharedModels/Interface/ICourseVideos';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
 courseViedosUrl="https://localhost:44326/api/CourseVideos"
  constructor(private http:HttpClient) { }
  getAllCourseViedos():Observable<CourseVideos[]>{
    return this.http.get<CourseVideos[]>(this.courseViedosUrl).pipe()
    
  }
  getAllCourseViedosById(id:number):Observable<CourseVideos>{
    console.log("entered")
    return this.http.get<CourseVideos>(this.courseViedosUrl+"/"+id).pipe()
  }
}
