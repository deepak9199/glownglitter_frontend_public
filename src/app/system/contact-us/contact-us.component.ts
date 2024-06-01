import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { contact } from '../../shared/model/contact';
import { CollectionService } from '../../shared/services/collection.service';
import { ToastrService } from 'ngx-toastr';
import { workinghours } from '../../shared/model/workinghours';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  workinghours: workinghours = {
    notice: '',
    sunday: '',
    website_background: '',
    weekday: ''
  }
  loading: boolean = false
  formData: contact = {
    name: '',
    contact: '',
    email: '',
    subject: '',
    message: ''
  };
  formMessage: string = '';
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService
  ) { }

  ngOnInit() {
    this.scrole()
    this.getworkinghours()
  }
  submitForm() {
    console.log(this.formData)
    this.addcontact(this.formData)
  }
  // rest form
  reset() {
    this.formData = {
      name: '',
      contact: '',
      email: '',
      subject: '',
      message: ''
    }
  }
  // add auther cart api
  private addcontact(data: contact) {
    this.loading = true
    this.collectionservice.addDocumnet("contacts", data)
      .subscribe({
        next: (docRef) => {
          // console.log('Document added with ID: ', docRef.id);
          this.reset()
          this.toster.success("Request Send Successfully")
          this.loading = false
        },
        error: (error) => {
          console.error('Error adding document: ', error);
          this.toster.error(error.message)
          this.loading = false
        },
        complete: () => {
          this.loading = false
        },
      });
  }
  // api call for workinghours
  private getworkinghours() {
    this.collectionservice.getData("workinghours").subscribe({
      next: (data: workinghours[]) => {
        if (data.length != 0) {
          this.workinghours = data[0]
          // console.log('call done')
          this.loading = false;
        }
        else {
          console.log("workinghours data not found")
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
