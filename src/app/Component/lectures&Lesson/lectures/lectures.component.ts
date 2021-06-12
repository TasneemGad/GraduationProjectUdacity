import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
 
  constructor(private router:Router,private active:ActivatedRoute) { }

  ngOnInit(): void {
  }
  category(){
this.router.navigate(['Courses'],{relativeTo:this.active})

  }
}
