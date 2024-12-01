// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {

// }


import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {DataService } from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import { UsertT } from 'src/app/models/userT.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetailsT:UsertT | undefined;
  
  constructor(private testService: TestService) { 

  }

  ngOnInit() {
    // console.log("header..")
    this.testService.user()
    .subscribe({
      next:(response)=>{
console.log(response)
        this.userDetailsT=response
      }
    });
   this.userDetailsT= this.testService.getUser();
  }

//     // call getProfileDetails method to get user details
//     this.getProfileDetails()

//   }

  getProfileDetails() {
console.log("header")
  // call getUserDetails method of dataService and assign response to userDetails property
  this.testService.getUserDetails()
  .subscribe({
    next:(response)=>{
      console.log(response)
      // this.userDetails=response
    },
    error:(error)=>{
      console.log(error)
    }
  })

  }

  logout() {

    // call doLogOut method
    this.testService.doLogOut()
    
  }

}
