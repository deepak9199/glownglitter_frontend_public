import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { order } from '../../shared/model/order';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {

  loading: boolean = false
  order: order = {
    orderId: '',
    usrid: '',
    pincode: '',
    address1: '',
    createdTime: {
      "seconds": 0,
      "nanoseconds": 0
    },
    state: '',
    country: '',
    city: '',
    note: '',
    address2: '',
    last_name: '',
    status: '',
    first_name: '',
    email: '',
    amount: 0,
    cartItems: [],
    contact: ''
  }
  constructor(
    private sharedservice: SharedService
  ) { }
  ngOnInit() {
    this.callshareddata()
  }
  //  call shared data function
  private callshareddata() {
    const data = this.sharedservice.getdata();
    if (data !== null) {
      let dataobj = JSON.parse(data)
      this.order = dataobj
    } else {
      console.log('order not found')
      this.loading = false
    }
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
