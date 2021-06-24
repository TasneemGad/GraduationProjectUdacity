import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { CourseVideos } from '../SharedModels/Interface/ICourseVideos';
import { catchError } from 'rxjs/operators';


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
    console.log("entered",id)
    return this.http.get<CourseVideos>(this.courseViedosUrl+"/"+id).pipe()
  }

  insertCourseViedo(CrsVideo:CourseVideos):Observable<CourseVideos>{
    return this.http.post<CourseVideos>(this.courseViedosUrl,CrsVideo).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }

  getCourseVideosByLessonId(lessonId:number):Observable<CourseVideos[]>{
    return this.http.get<CourseVideos[]>(this.courseViedosUrl+"/CourseVideosByLessonId/"+lessonId).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
  //delete
  deleteCourseVideos(id:number):Observable<CourseVideos>{
    return this.http.delete<CourseVideos>(this.courseViedosUrl+"/"+id).pipe(catchError((err) => {
      return throwError(err.message || "error")
    }))
  }
}
