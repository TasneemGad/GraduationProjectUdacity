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
  apiUrl="https://localhost:44326";
  isOpen:boolean=false
  response:any
  Category:ICategory={id:0,catName:"",catDescription:"",catImage:""}
  check:number=0
  catImg:string=""
  AddOrUpdate:string
  router:any
  ShowList(){
    this.isOpen=false
  }
  ShowAddNewCategory(){
    this.isOpen=true
    this.Category={id:0,catName:"",catDescription:"",catImage:""}
    if(this.Category.id!=this.check){
      this.AddOrUpdate="Add"
    }
  }
  ngOnInit(): void {
    this.getAllCategory()
  }
  updateCatbtnClick(Cat:ICategory){
    this.isOpen=true;
    this.Category=Cat;
    // this.catId=this.Course.categoryId
    this.catImg="https://localhost:44326/"+Cat.catImage
    if(Cat.id!=this.check){
      this.AddOrUpdate="Update"
    }
    console.log(Cat,"Crrrrrrrrrrrrrrrrrrs")
  }
  getAllCategory(){
    this.categoryService.getCategories().subscribe(data=>{
        this.allCategory = data
      });
    
  }

  public uploadCatImgLogoFinished = (event:any) => { 
    this.response = event;      
    console.log(this.response.dbPath) 
    this.Category.catImage=this.response.dbPath
  }
  public uploadUpdateCatLogoFinished = (event:any,catId:number,Cat:ICategory) => { 
    this.response = event;    
    console.log(this.response)      
    Cat.catImage=this.response.dbPath
    console.log(Cat)      
    //  this.categoryService.updateCategory(catId,Cat).subscribe(
    //    data=>{
    //      console.log(data)
    //    }
    //  )
  }


  UpdateCatData(){
    this.categoryService.updateCategory(this.Category.id,this.Category).subscribe(
      sucess=>{
        console.log(sucess,"sucess")
        // this.UpdateCrs=true
        this.isOpen=false
        this.getAllCategory();

      }
    )
  }
  AddNewCategory(){
    this.categoryService.insertCategory(this.Category).subscribe(
      sucess=>{
        console.log(sucess,"sucess")
        // this.UpdateCrs=true
        this.isOpen=false
        // window.location.reload();
        this.getAllCategory();
      }
    )
  }
  deleteCatbtnClick(catId:number){
    console.log(catId)
    this.categoryService.deleteCategory(catId).subscribe(
      data=>{
        console.log("Data",data)        
        // window.location.reload();
        this.getAllCategory();

      }
    )
  }
  public createImgPath = (imagePath: string) => {  
    return `${this.apiUrl}/${imagePath}`;
}

}
