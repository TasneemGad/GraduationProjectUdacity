import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    apiUrl="https://localhost:44326";
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const Token = localStorage.getItem("token");
        const isApiUrl = request.url.startsWith(this.apiUrl);
        if (Token && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${Token}`                    
                }
            });
        }
        
        return next.handle(request);
    }
}