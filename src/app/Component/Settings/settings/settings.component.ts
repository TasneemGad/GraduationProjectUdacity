import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public Url : any
  flag = false

  constructor(private activatedRouter:ActivatedRoute, private router:Router){
  }
  
   ngOnInit(){
   
  }
  getUrl(pass:any){

    console.log("url2", pass );
    this.Url=pass
    // if(pass === "newPassword" ) 
    // {
    //   this.flag = true
    // }
    // else if(pass === "Notifications" ){
    //   this.flag = true
    // }
    // else if(pass === "linkedAccount" ){
    //   this.flag = true
    // }
    // else{
    //   this.flag = false
    // }
  }

}
