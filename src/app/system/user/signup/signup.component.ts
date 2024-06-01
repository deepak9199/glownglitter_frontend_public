import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserCredential } from 'firebase/auth';
import { users } from '../../../shared/model/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  loading: boolean = false

  constructor(private authService: AuthService,
    private router: Router,
    private toster: ToastrService) { }

  register(email: string, password: string, name: string, contact: string): void {
    if (name === "" && contact === "") {
      this.toster.error("Enter Name And Contact")
    }
    else if (name === "") {
      this.toster.error("Enter Name")

    }
    else if (contact === "") {
      this.toster.error("Enter  Contact")
    }
    else {
      this.resitrationapi(email, password, name, contact)
    }
  }
  // resgister auth suer
  private resitrationapi(email: string, password: string, name: string, contact: string) {
    // console.log(email, password)
    this.loading = true
    this.authService.registerWithEmailAndPassword(email, password)
      .subscribe(
        (userCredential) => {
          if (userCredential) {
            // Registration successful, handle success
            // console.log('Registration successful:', userCredential.user?.uid);
            // create user 
            let user: users = {
              contact: contact,
              createdTime: userCredential.user?.metadata.creationTime || "",
              email: email,
              name: name,
              uid: userCredential.user?.uid || ''
            }
            // add user after registration
            this.adduserapi(user)
          } else {
            // Registration failed, handle error
            this.toster.error('Registration failed.');
            this.loading = false
          }
        });
  }
  // add auther user
  adduserapi(data: users) {
    this.authService.addUsers(data)
      .subscribe({
        next: (docRef) => {
          console.log('Document added with ID: ', docRef.id);
          // You can perform further actions here if needed
          this.router.navigate(['/login']).then(() => {
            this.toster.success('Registration successful Now You Can Login')
          })
        },
        error: (error) => {
          console.error('Error adding document: ', error);
        },
        complete: () => {
          this.loading = false
        },
      });
  }
}
