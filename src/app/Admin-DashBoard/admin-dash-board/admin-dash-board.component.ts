import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent implements OnInit {

  constructor(private Authservices:AuthenticationService) { }

  ngOnInit(): void {
  }
  Logout(){
    this.Authservices.logout();   
    }

}
