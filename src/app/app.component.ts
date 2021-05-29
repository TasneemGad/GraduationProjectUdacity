import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'udacityproject';
  currentUrl : any
  public currentUrl2 : any
  flag = true

  constructor(private activatedRouter:ActivatedRoute, private router:Router){
  }
  
   ngOnInit(){
    // this.hh = this.activatedRouter.snapshot
    this.f();
  }
  f(){
  this.currentUrl = this.router.events.subscribe(
    (event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentUrl2 = event.url
        console.log("f", this.currentUrl2 );
        if(this.currentUrl2 === "/SignUP") 
        {
          this.flag = false
        }
        else{
          this.flag = true
        }
      }
    });
console.log("url",this.currentUrl2);
  }

}
