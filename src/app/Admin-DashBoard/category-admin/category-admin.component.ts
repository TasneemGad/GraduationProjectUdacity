import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {

  allCategory:ICategory[]
  constructor(private categoryService:CategoryService) { }
  isOpen:boolean=false
  addNew(){
    this.isOpen=!this.isOpen
  }
  ngOnInit(): void {
    this.getAllCategory()
  }

  getAllCategory(){
    this.categoryService.getCategories().subscribe(data=>{
        this.allCategory = data
      });
    
  }

}
