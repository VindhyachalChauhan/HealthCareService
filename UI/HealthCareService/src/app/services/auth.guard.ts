import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TestService } from './test.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService=inject(CookieService);
  const testService=inject(TestService);
  const router=inject(Router);
  const user=testService.getUser();

  //check jwt token
  let token=cookieService.get('Authorization');


  if(token && user){
    console.log('both true')
    token=token.replace('Bearer ','')
    const decodedToken=jwtDecode(token)

    //check expired
const expirationDate=decodedToken.exp=1000;
const currentDate=new Date().getTime();

// if(expirationDate<currentDate){
//   //logout
//   testService.doLogOut();
//     return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})

// }
 return true

  } else{
    testService.doLogOut();
    return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
  }


};
