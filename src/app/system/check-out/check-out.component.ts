import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { cart, cartTotalAmount } from '../../shared/model/cart';
import { checkout } from '../../shared/model/checkout';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from '../../shared/services/collection.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { Router } from '@angular/router';
import { CartItem, order } from '../../shared/model/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  loading: boolean = false
  cart: cart[] = []
  carttotalamount: cartTotalAmount = {
    sub_total: 0,
    shipping_charge: 0,
    total: 0
  }
  // Get the current date and time
  currentDate = new Date();

  // Extract seconds and milliseconds
  seconds = Math.floor(this.currentDate.getTime() / 1000); // Divide by 1000 to get seconds
  nanoseconds = this.currentDate.getMilliseconds() * 1000000; // Milliseconds to nanoseconds

  // Initialize customTimestamp object
  customTimestamp = {
    seconds: this.seconds,
    nanoseconds: this.nanoseconds
  };
  constructor(
    private dataService: CollectionService,
    private toster: ToastrService,
    private sharedService: SharedService,
    private router: Router,
    private tokenstorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.callshareddata()
    this.scrole()
  }
  //  call shared data function
  callshareddata() {
    const data = this.sharedService.getcartdata();
    if (data !== null) {
      let datacehcekout: checkout = JSON.parse(data);
      this.cart = datacehcekout.cart
      this.carttotalamount = datacehcekout.carttotal
    } else {
      console.log('product data not found')
    }
  }
  // order delete api
  deletecartapi(id: string) {
    this.loading = true
    this.dataService.deleteDocument("cart", id).subscribe({
      next: () => {
        console.log("deleted")
        this.ngOnInit()
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
    });
  }
  // conform order
  placeorder(pincode: string, address1: string, state: string, city: string, note: string, address2: string, last_name: string, first_name: string, email: string, contact: string) {
    let orderid = this.generateRandom10DigitNumber()
    let cartitemcreated: CartItem[] = []
    // cart item create
    this.cart.map((item: cart) => {
      let cartitemdata: CartItem = {
        varientId: '',
        sku: item.sku,
        sub_category: item.sub_category,
        category: item.category,
        orderId: orderid.toString(),
        stocks: item.stocks,
        productname: item.productname,
        userId: item.userId,
        price: item.price,
        imageUrl: item.imageUrl,
        id: item.id,
        quantity: item.quantity
      }
      cartitemcreated.push(cartitemdata)
    })
    if (cartitemcreated.length != 0) {
      let orderdetail: order = {
        orderId: orderid.toString(),
        usrid: this.tokenstorage.getUser().uid,
        pincode: pincode,
        address1: address1,
        createdTime: this.customTimestamp,
        state: state,
        country: "india",
        city: city,
        note: note,
        address2: address2,
        last_name: last_name,
        status: 'requested',
        first_name: first_name,
        email: email,
        amount: this.carttotalamount.total,
        cartItems: cartitemcreated,
        contact: contact
      }
      // console.log(orderdetail)
      this.addorderapi(orderdetail)
    }
    else {
      console.log("cart item not found")
    }

  }
  // add auther cart api
  private addorderapi(data: order) {
    this.loading = true
    this.dataService.addDocumnet("orders", data)
      .subscribe({
        next: (docRef) => {
          console.log('Document added with ID: ', docRef.id);
          this.toster.success("Order Placed Successfully")
          this.cart.map((item: cart) => {
            this.deletecartapi(item.id)
          })
          this.router.navigate(['/account'])
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
  // order id genterator
  private generateRandom10DigitNumber() {
    // Generate a random number between 1000000000 and 9999999999
    // (10^9 and 10^10 - 1)
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
