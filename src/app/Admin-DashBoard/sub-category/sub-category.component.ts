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
 

  check:number=0;
  AddOrUpdate:string=""
 
  allSubcategory:ISubCategory[]=[]
  allCategory:ICategory[]=[]
 
  response:any
  catId:number=0
  stringResponse:string=""
  apiUrl="https://localhost:44326";
  Subcat:ISubCategory={subCategoryTitle : "", categoryID :0,subCategoryDescribtion:"",id:0}

  constructor(private fb: FormBuilder, private SubCategoryServices: SubCategoryService, private catServices: CategoryService,
    private router: Router, private active: ActivatedRoute,
  ) { }
  ShowList(){
    this.isOpen=false
    
  }
  ShowAddNewsub(){
    this.isOpen=true
    this.Subcat={subCategoryTitle : "", categoryID :0,subCategoryDescribtion:"",id:0}
    if(this.Subcat.id!=this.check){
      this.AddOrUpdate="Add"
    }
  }
  ngOnInit(): void {
    this.getSubCategory();
    this.getAllCategory();
  
    
  }
  getSubCategory(){
    this.SubCategoryServices.getAllSubCategory().subscribe(data=>
      {
        console.log("dataSub",data)
        this.allSubcategory = data
      })
  }
  getAllCategory(){
    this.catServices.getCategories().subscribe(data=>
      {
        console.log("dataSub",data)
        this.allCategory = data
      })
  }
  updateSubbtnClick(Sub:ISubCategory){
    this.isOpen=true;
    this.Subcat=Sub;
    this.catId=this.Subcat.categoryID;

    
    if(Sub.id!=this.check){
      this.AddOrUpdate="Update"
    }
    console.log(Sub,"suuuuuuub")
  }
  AddNewSub(){
    console.log(this.Subcat)
   
    this.SubCategoryServices.postSubCategory(this.Subcat).subscribe(
      addesCrs=>{
        console.log("Done")
        // this.AddCrs=true
        this.isOpen=false
        this.getSubCategory();
      }
    )
  }
  UpdateSubData(){
    this.SubCategoryServices.UpdateSubCategory(this.Subcat.id,this.Subcat).subscribe(
      sucess=>{
        console.log(sucess,"sucess")
        this.isOpen=false
        this.getSubCategory();
        // this.UpdateCrs=true
      }
    )
    console.log(this.Subcat)
    
  }


  deleteSub(SubId:number){
   
    this.SubCategoryServices.deleteSubCategory(SubId).subscribe(
      data=>{
        console.log("Deleted")
        this.getSubCategory();;

        //this.deleted=true
      }
    )
  }
 

  

}
    
  
  