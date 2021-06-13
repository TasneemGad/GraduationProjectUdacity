import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent, ParamMap } from '@angular/router';
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
  idCourse : any

  constructor(private activatedRouter:ActivatedRoute, private router:Router){
  }
  
   ngOnInit(){
    this.getUrl();

    this.activatedRouter.paramMap.subscribe((params:ParamMap)=>{
      this.idCourse =  params.get('id')
      console.log("idCourse", this.idCourse)
    })
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
<<<<<<< HEAD
        this.currentUrl=== "/Setting/Courses"||this.currentUrl==="/Lectures" ||this.currentUrl=== "/Courses"||this.currentUrl=== "/Lectures/Lesson") 
=======
        this.currentUrl=== "/Setting/Courses"||this.currentUrl==="/Lectures" ||this.currentUrl=== "/Courses"
        ) 
>>>>>>> 5a4b1e6d9b91acfbd575a7c0fd62b290df0d0758
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
