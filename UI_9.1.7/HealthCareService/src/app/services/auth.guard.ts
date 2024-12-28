import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate(): boolean {
    // return true if authenticated else redirect to login page
    var data: boolean
    this.dataService.getAuthStatus().subscribe(
      response => {
        data = response
      },
      error => {
        this.router.navigate(['/login'])
      }
    )
    if (data) {
      return true;
    } else {
      this.router.navigate(['/login'])
    }
  }

}
