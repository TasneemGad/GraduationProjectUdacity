import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILogin } from '../SharedModels/Interface/ILogin';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    apiUrl="https://localhost:44326";
    key:any;
    private userSubject: BehaviorSubject<ILogin>;
    public user: Observable<ILogin>;
    userN: any;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.key=localStorage.getItem('user');
        this.userSubject = new BehaviorSubject<ILogin>(JSON.parse(this.key));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): ILogin {
        return this.userSubject.value;
    }
    
   
    login(username: string, PasswordHash: string) {
        return this.http.post<any>(`${this.apiUrl}/Login`, { username, PasswordHash })
            .pipe(map(res => {
                this.setSession(res);
                this.userSubject.forEach(el=>{
                   console.log(el.userName)
                });
            }));
    }

   
    private setSession(authResult:any) {
        //const expiresAt = moment().add(authResult.expiresIn,'second');
        const expiresAt = authResult.expiration;
        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt));//.valueOf()) );
    }  

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        this.router.navigate(['/login']);
    }
    
    public isLoggedIn() {
        if(localStorage.getItem('token')){
            let token:any = localStorage.getItem('token');

            let jwtData = token.split('.')[1]

            let decodedJwtJsonData = window.atob(jwtData)

            let decodedJwtData = JSON.parse(decodedJwtJsonData)

            let expirationDateInMills = decodedJwtData.exp * 1000;

            let todayDateInMills = new Date().getTime();

            if (expirationDateInMills >= todayDateInMills)
                return true;
            
        }
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
    getRole():string {
        if(localStorage.getItem('token')){
            let token:any = localStorage.getItem('token');

            let jwtData = token.split('.')[1]

            let decodedJwtJsonData = window.atob(jwtData)

            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            return decodedJwtData.role;
        }
        return "No Role";
      }
    getUserId(){
        if(localStorage.getItem('token')){
            let token:any = localStorage.getItem('token');

            let jwtData = token.split('.')[1]

            let decodedJwtJsonData = window.atob(jwtData)

            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            let userID=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            return userID;
        }
        return null;
    }
    
}