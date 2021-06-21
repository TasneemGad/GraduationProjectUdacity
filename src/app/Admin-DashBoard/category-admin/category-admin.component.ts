import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {

  constructor() { }
  isOpen:boolean=false
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
  }

}
