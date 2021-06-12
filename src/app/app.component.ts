import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udacityproject';
  public currentUrl : any
  flag = true

  constructor(private activatedRouter:ActivatedRoute, private router:Router){
  }
  
   ngOnInit(){
    this.getUrl();
  }
  getUrl(){
   this.router.events.subscribe(
    (event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentUrl = event.url
        console.log("url", this.currentUrl );
        if(this.currentUrl === "/SignIn" || this.currentUrl === "/SignUP" ||
        this.currentUrl ===  "/orderDetails" ||this.currentUrl === "/payment"||
        this.currentUrl === "/ClassRoom"|| this.currentUrl ===  "/Setting"||
        this.currentUrl  === "/Setting/Personal_Information"||this.currentUrl=== "/Setting/LanguagePreference"||
        this.currentUrl==="/Setting/newPassword" || this.currentUrl==="/Setting/Notification" ||
        this.currentUrl=== "/Setting/LinkedAccount" || this.currentUrl=== "/Setting/SubscriptionsBilling"||
        this.currentUrl=== "/Setting/Courses" ) 
          {
          this.flag = false
        }
        else{
          this.flag = true
        }
      }
    });
  }
}
