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
