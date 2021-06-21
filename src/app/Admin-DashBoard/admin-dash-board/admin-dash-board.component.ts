import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent implements OnInit {

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
    }

}
