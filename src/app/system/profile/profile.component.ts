import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from '../../shared/services/collection.service';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { CreatedTime, order } from '../../shared/model/order';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { cart } from '../../shared/model/cart';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  order: order[] = []
  loading: boolean = true

  constructor(
    private dataService: CollectionService,
    private toster: ToastrService,
    private sharedService: SharedService,
    private router: Router,
    private auth: AuthService,
    private tokenstorage: TokenStorageService
  ) { }

  ngOnInit() {

    this.getorderapi()
    this.scrole()
  }
  sharedorderdata(data: order) {
    this.sharedService.savedata(JSON.stringify(data))
    this.router.navigate(['/vieworder'])
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  // api call for category_master
  private getorderapi() {
    this.loading = true
    this.dataService.getData("orders").subscribe({
      next: (data: order[]) => {
        if (data.length != 0) {
          this.order = data.filter((item: order) => item.usrid === this.tokenstorage.getUser().uid)
          this.loading = false
        }
        else {
          console.log("category_master data not found")
          this.loading = false
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
    });
  }
  formatCustomTimestamp(customTimestamp: CreatedTime) {
    // Convert seconds to milliseconds
    const milliseconds = customTimestamp.seconds * 1000;

    // Add nanoseconds (converted to milliseconds) to milliseconds
    const finalMilliseconds = milliseconds + Math.floor(customTimestamp.nanoseconds / 1000000);

    // Create a new Date object with the final milliseconds
    const date = new Date(finalMilliseconds);

    // Convert date to a human-readable format
    return date.toLocaleString();
  }
  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): void {
    if (oldPassword != "" && newPassword != "" && confirmPassword != "") {
      this.auth.changePasswordWithConfirmation(oldPassword, newPassword, confirmPassword)
        .subscribe(success => {
          if (success) {
            // Password changed successfully, do something
            this.toster.success('Password changed successfully');
          } else {
            // Failed to change password, handle error
            this.toster.error('Failed to change password');
          }
        });
    }
    else {
      this.toster.error("Empty textField")
    }

  }
}
