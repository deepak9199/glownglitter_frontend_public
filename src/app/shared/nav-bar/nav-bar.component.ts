import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from '../services/collection.service';
import { SharedService } from '../services/shared.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  islogin: boolean = false
  sideclass: string = 'off-canvas-wrapper';
  constructor(
    private tokenstorage: TokenStorageService,
    private router: Router,
    private sharedservice: SharedService
  ) { }

  ngOnInit() {
    this.gettrigertrefresh()
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
  }
  sideopen() {
    // logic to change the class name
    this.sideclass = 'off-canvas-wrapper open';
  }
  sideclose() {
    // logic to change the class name
    this.sideclass = 'off-canvas-wrapper';
  }
  cart() {
    let token = this.tokenstorage.getToken()
    if ((this.ValidatorChecker(token))) {
      this.router.navigate(['/cart'])
    }
    else {
      this.router.navigate(['/login'])
    }
  }
  private ValidatorChecker(data: any) {

    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
  private gettrigertrefresh() {
    this.sharedservice.functionTriggerObservable.subscribe(() => {
      this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
    });
  }
  trigertrefreshsearch(data: string) {

    // console.log(data)
    if (data != "") {
      this.sharedservice.savesearchdata(data)
      this.router.navigate(['/search']).then(() => {
        this.sharedservice.triggerFunctionsearch();
        this.sideclose()
      })
    }

  }
}
