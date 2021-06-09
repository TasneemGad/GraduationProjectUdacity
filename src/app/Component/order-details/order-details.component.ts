import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  flag = false

  constructor() { }

  ngOnInit(): void {
  }
  toggelCode(){
    if(this.flag == false)
    {
      this.flag = true
    }
    else
    {
      this.flag = false
    }
  }
}
