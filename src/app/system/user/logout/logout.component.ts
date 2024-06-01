import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { sign } from 'crypto';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  loading: boolean = true
  constructor(
    private authService: AuthService,
    private router: Router,
    private toster: ToastrService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.signout()
  }
  logout() {
    this.authService.logout();
    this.trigertrefreshnavbar()
    this.router.navigate(['/']).then(() => {
      this.toster.success('Logout SuccessFully')
      this.loading = false
    });
  }
  // logout api
  signout() {
    this.authService.signOut().subscribe(
      (response) => {
        // console.log(response)
        this.logout()
      },
      error => {
        console.error(error)
        this.toster.error('error in logout')
      })
  }
  private trigertrefreshnavbar() {
    this.sharedService.triggerFunction();
  }
}
