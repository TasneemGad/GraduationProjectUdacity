import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { ICategory } from 'src/app/SharedModels/Interface/ICategory';
import { ISubCategory } from 'src/app/SharedModels/Interface/ISubCategory';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  isOpen:boolean=false
  isUpdate:boolean=false
  addSubCategoryForm:FormGroup
  addSubCategory:ISubCategory
  allSubCategory:ISubCategory[]
  SubCategoryByid:ISubCategory
  allCategory:ICategory[]
  
  constructor(private fb:FormBuilder , private SubCategoryServices:SubCategoryService, private catServices:CategoryService,
    private router:Router ,private active :ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.addSubCategory={subCategoryTitle:"",subCategoryDescribtion:"",categoryID:1}

  this.addSubCategoryForm=this.fb.group({
  id: [''],
  subCategoryTitle:[''],
  categoryID: [''],
  subCategoryDescribtion: [''],
 })
   this.getSubCategory();
    this.getAllCategory();
  }
  addNew(){
    this.isOpen=!this.isOpen
  }
 onsubmit(){
  this.AddSubCategory();
  this.SubCategoryServices.postSubCategory(this.addSubCategory).subscribe(sucess=>{
  console.log("addsome",sucess,this.addSubCategoryForm)
  this.router.navigateByUrl("/DashBoard/SubCategory")
})
  }
  AddSubCategory(){
    console.log("addcat")
    // this.addSubCategory.id=this.addSubCategoryForm.value.id
    this.addSubCategory.subCategoryTitle=this.addSubCategoryForm.value.subCategoryTitle
    this.addSubCategory.subCategoryDescribtion=this.addSubCategoryForm.value.subCategoryDescribtion
    this.addSubCategory.categoryID=this.addSubCategoryForm?.value.categoryID
  console.log("addsomehh",this.addSubCategoryForm)

  }
  getSubCategory(){
    console.log("add")
   this.SubCategoryServices.getAllSubCategory().subscribe(sucess=>{
      this.allSubCategory=sucess
     console.log("lec",sucess)
   })
  }
  getAllCategory(){
    console.log("add")
   this.catServices.getCategories().subscribe(sucess=>{
      this.allCategory=sucess
     console.log("lec",this.allCategory)
   })
  }
  DeleteItem(id:number){
    this.SubCategoryServices.deleteSubCategory(id).subscribe(sucess=>{
      console.log("delete",sucess,id)
    })
  }
  updateItem(id:number , update:ISubCategory){
    this.SubCategoryServices.UpdateSubCategory(id ,update).subscribe(sucess=>{
      console.log("ee",sucess)
    })
  }
  updateElement(id:number){
    this.isUpdate=!this.isUpdate
    this.SubCategoryServices.getSubCategoryById(id).subscribe(sucess=>{this.SubCategoryByid=sucess,console.log("enter",id)
    })
  }

}
