import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private cookiService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.addAuthenticationToken(request)){

    
    const authRequest=request.clone({
      setHeaders:{
        'Authorization':this.cookiService.get('Authorization')
      }
    });
    return next.handle(authRequest);
  }
     return next.handle(request);
  }

  // private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any>{
    private addAuthenticationToken(request: HttpRequest<any>): boolean{

        // should add authorization token into headers except login and signup
    
        return request.urlWithParams.indexOf('addAuth=true',0)>-1?true:false;
  
    
        
      }
}



// import { Injectable } from '@angular/core'
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {

//   private AUTH_HEADER = "Authorization";

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//   return;

//   }

//   private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

//     // should add authorization token into headers except login and signup

//     return;

    
//   }

// }

