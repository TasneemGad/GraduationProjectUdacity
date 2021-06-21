import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent implements OnInit {

<<<<<<< HEAD
  constructor(private Authservices:AuthenticationService,private router:Router,private active:ActivatedRoute) { }

  ngOnInit(): void {
  }
 
    goTo(){
       this.router.navigate(['Lectures'],{relativeTo:this.active})
=======
  constructor(private Authservices:AuthenticationService,private router:Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }
  GoToCategory()
  {
    this.router.navigate(['Category'],{relativeTo:this.activatedRouter})
  }
  GoToCourse()
  {
    this.router.navigate(['Course'],{relativeTo:this.activatedRouter})
  }
  GoToLesson()
  {
    this.router.navigate(['Lesson'],{relativeTo:this.activatedRouter})
  }
  Logout(){
    this.Authservices.logout();   
>>>>>>> 15332c870a34b9011799ce8eec948897d5a8bcf9
    }
    goToSub(){
      this.router.navigate(['SubCategory'],{relativeTo:this.active})
    }
    goToContent(){
      this.router.navigate(['LessonContent'],{relativeTo:this.active})
    }
    Logout(){
      this.Authservices.logout();   
      }

}
