import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public Url : any
  flag = false

  constructor(private activatedRouter:ActivatedRoute, private router:Router, private Authservices:AuthenticationService){
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

  GoToSettingPersonalInformation()
  {
    this.router.navigate(['Personal_Information'],{relativeTo:this.activatedRouter})
  }
  GoToSettingPassword()
  {
    this.router.navigate(['newPassword'],{relativeTo:this.activatedRouter})
  }
  GoToSettingNotifications()
  {
    this.router.navigate(['Notification'],{relativeTo:this.activatedRouter})
  }
  GoToSettingLinkedAccount()
  {
    this.router.navigate(['LinkedAccount'],{relativeTo:this.activatedRouter})
  }
  GoToSettingLanguagePreference()
  {
    this.router.navigate(['LanguagePreference'],{relativeTo:this.activatedRouter})
  }
  GoToSettingSubscriptions()
  {
    this.router.navigate(['SubscriptionsBilling'],{relativeTo:this.activatedRouter})
  }
  GoToSettingCourses()
  {
    this.router.navigate(['Courses'],{relativeTo:this.activatedRouter})
  }
  Logout(){
    localStorage.removeItem("lastCourseId")
    this.Authservices.logout();   
    }
}
