import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICountry } from "../SharedModels/Interface/ICountry";

const API_URL = 'https://localhost:44326/api/Country';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
  })

export class CountryService {
    Coountry:ICountry
    countries: ICountry[]=[];
    constructor(private http:HttpClient){
    }
    getAllCountry() {      
       return this.http.get(API_URL).toPromise().then(res=>this.countries =res as ICountry[]);               
    }

 
    postCountry(country_Name: string): Observable<any> {    
            this.Coountry.country_Name=country_Name;
      return this.http.post(API_URL ,this.Coountry,httpOptions);
    } 

    getCountryName(id:number): Observable<any>{
      return this.http.get(API_URL+'/'+id)                
    }
}