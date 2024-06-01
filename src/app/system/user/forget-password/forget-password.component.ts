import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  loading: boolean = false

  constructor(
    private authService: AuthService, private router: Router,
    private toster: ToastrService,
    private tokenstorage: TokenStorageService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  // login function
  forgetpass(email: string) {
    if (email === "") {
      this.toster.error("Email && Password is empty")
    }
    else {
      // console.log(email, password)
      this.forgetpassapi(email)
    }

  }
  // forget pass api
  private forgetpassapi(email: string) {
    if (email != 'info@glownglitter.com') {
      this.loading = true
      this.authService.sendPasswordResetEmail(email).subscribe(
        response => {
          this.toster.success('Password reset email sent successfully')
          this.loading = false
        },
        error => {
          console.error('Error  Forget password:', error);
          this.toster.error('Error Forget password')
          this.loading = false
        }
      );
    }
    else {
      this.toster.error('No Access')
    }

  }

}
