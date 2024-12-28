import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { UsertT } from '../models/userT.model';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  $user=new BehaviorSubject<UsertT|undefined>(undefined);
  userId!:string

  constructor(private api :ApiService,
    private cookieService:CookieService
  ) { }

  authenticateUserT(user_email: string, password: string){
    return this.api.checkLogin(user_email,password)
   
   }
   setUser(user:UsertT):void{
     this.$user.next(user)
     this.userId=user.id
     console.log("setUser.",this.$user)
     localStorage.setItem('id',user.id)
   
     // localStorage.setItem('user-email',user.user_email)
     // localStorage.setItem('token',user.user_mobile)
    }
   user():Observable<UsertT|undefined>{
     //  console.log("user...")
     return this.$user.asObservable();
   }


   getUser():UsertT|undefined{
    const id=localStorage.getItem('id')
    if(id)
    {
      const user:UsertT={
        id:id
      };
      return user;
    }
    return undefined
   }

   getUserDetails(): Observable<any> {
    // should return user details retrieved from api service
  //  this.userId!= localStorage.getItem('id')
   console.log("dataService..",this.userId)

    return this.api.getUserDetails(this.userId).pipe(catchError(this.handleError));
  }
  updateProfile(userId:string, userDetails: any): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.updateDetails(userId,userDetails).pipe(catchError(this.handleError));
  }

   doLogOut() {
    localStorage.clear();
    this.cookieService.delete('Authorization','/')
    this.$user.next(undefined)
    // You should remove the key 'id', 'token' if exists
    // this.isLoggedIn=false
    // this.isLogIn=new BehaviorSubject(false)
    // localStorage.removeItem('id')
    // localStorage.removeItem('token')

  }
   private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error)

  }
   
}
