import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent implements OnInit {

  constructor(private Authservices:AuthenticationService,private router:Router,private active:ActivatedRoute) { }

  ngOnInit(): void {
  }
 
    goTo(){
       this.router.navigate(['Lectures'],{relativeTo:this.active})
    }
 
  GoToCategory()
  {
    this.router.navigate(['Category'],{relativeTo:this.active})
  }
  GoToCourse()
  {
    this.router.navigate(['Course'],{relativeTo:this.active})
  }
  GoToLesson()
  {
    this.router.navigate(['Lesson'],{relativeTo:this.active})
  }
 
    goToSub(){
      this.router.navigate(['SubCategory'],{relativeTo:this.active})
    }
    goToContent(){
      this.router.navigate(['LessonContent'],{relativeTo:this.active})
    }

    goToCourseVideos(){
      this.router.navigate(['CourseVideos'],{relativeTo:this.active})
    }

    goToQuestionGroup(){
      this.router.navigate(['QuestionGroup'],{relativeTo:this.active})

    }

    goToQuestionOption(){
      this.router.navigate(['QuestionOptiones'],{relativeTo:this.active})

    }
    goToTrueAndFalse(){
      this.router.navigate(['TrueAndFalses'],{relativeTo:this.active})

    }
    Logout(){
      this.Authservices.logout();   
      }

}
