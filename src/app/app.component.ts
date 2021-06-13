import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent, ParamMap, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

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
  visibility:boolean=false;
  constructor(private activatedRouter:ActivatedRoute, private router:Router){
  }
  
  
   ngOnInit(){
    // this.getUrl();

    this.activatedRouter.paramMap.subscribe((params:ParamMap)=>{
      this.idCourse =  params.get('id')
      console.log("idCourse", this.idCourse)
    })

    // start
    this.router.events.pipe(
      filter(events=>events instanceof NavigationEnd),
      map(evt =>this.activatedRouter),
      map(route => {
      while(route.firstChild) {
      route = route.firstChild;
      }
      return route;
      }))
      .pipe(
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
).subscribe(x=>x.footer===true && x.header===true ?this.visibility=true:this.visibility=false)
    //end  
  }
  
  // getUrl(){
  //  this.router.events.subscribe(
  //   (event: NavigationEvent) => {
  //     if(event instanceof NavigationStart) {
  //       this.currentUrl = event.url
  //       console.log("url", this.currentUrl );
  //       if(this.currentUrl === "/SignIn" || this.currentUrl === "/SignUP" ||
  //       this.currentUrl ===  "/orderDetails" ||this.currentUrl === "/payment"||
  //       this.currentUrl === "/ClassRoom"|| this.currentUrl ===  "/Setting"||
  //       this.currentUrl  === "/Setting/Personal_Information"||this.currentUrl=== "/Setting/LanguagePreference"||
  //       this.currentUrl==="/Setting/newPassword" || this.currentUrl==="/Setting/Notification" ||
  //       this.currentUrl=== "/Setting/LinkedAccount" || this.currentUrl=== "/Setting/SubscriptionsBilling"||
  //       this.currentUrl=== "/Setting/Courses"||this.currentUrl==="/Lectures/Lesson" ||this.currentUrl=== "/Courses"
  //       ) 
  //         {
  //         this.flag = false
  //       }
  //       else{
  //         this.flag = true
  //       }
  //     }
  //   });
  // }


}
