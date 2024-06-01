import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from '../../shared/services/collection.service';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { cart, cartTotalAmount } from '../../shared/model/cart';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { othercharges } from '../../shared/model/othercharges';
import { checkout } from '../../shared/model/checkout';
import { products } from '../../shared/model/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  loading: boolean = false
  cart: cart[] = []
  products: products[] = []
  carttotalamount: cartTotalAmount = {
    sub_total: 0,
    shipping_charge: 0,
    total: 0
  }
  constructor(
    private dataService: CollectionService,
    private toster: ToastrService,
    private sharedService: SharedService,
    private router: Router,
    private tokenstorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.getproductapi()
    this.scrole()
  }
  // cart api
  private getcartapi() {
    this.loading = true
    this.dataService.getData("cart").subscribe({
      next: (data: cart[]) => {
        if (data.length != 0) {
          this.cart = data.filter((item: cart) => item.userId === this.tokenstorage.getUser().uid)
          // console.log(this.cart)
          if (this.cart.length != 0) {
            this.getotherchargesapi(this.cart)
          }
          else {
            console.log("cart is empty")
            this.loading = false
          }
        }
        else {
          this.cart = []
          this.carttotalamount.shipping_charge = 0
          this.carttotalamount.sub_total = 0
          this.carttotalamount.total = 0
          console.log("Sub_category_master data not found")
          this.loading = false
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
    });
  }
  // cart api
  deletecartapi(id: string) {
    this.loading = true
    this.dataService.deleteDocument("cart", id).subscribe({
      next: () => {
        // console.log("deleted")
        this.ngOnInit()
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
    });
  }
  // cart api
  private getotherchargesapi(cart: cart[]) {
    this.dataService.getData("othercharges").subscribe({
      next: (data: othercharges[]) => {
        if (data.length != 0) {
          this.carttotalamount.shipping_charge = data[0].delivery
          this.carttotalamount.sub_total = this.totalcartprise(cart)
          this.carttotalamount.total = Number(this.carttotalamount.sub_total) + Number(this.carttotalamount.shipping_charge)
          // console.log(this.carttotalamount)
          this.loading = false
        }
        else {
          console.log("Sub_category_master data not found")
          this.loading = false
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
    });
  }
  // total calculate functionF
  private totalcartprise(cart: cart[]): number {
    let result: number = 0
    cart.map((item: cart) => {
      result = result + item.price
    })
    return result
  }
  updatefunction(data: cart, quantity: string, index: number) {
    // console.log(data)
    // console.log(this.products.filter((item: products) => item.sku === data.sku))
    let productstoke: number = this.products.filter((item: products) => item.sku === data.sku)[0].stocks
    // console.log(productstoke)
    if (Number(quantity) <= productstoke && Number(quantity) > 0) {
      this.cart[index].price = (data.price / data.quantity) * Number(quantity)
      this.cart[index].quantity = Number(quantity)
      this.carttotalamount.sub_total = this.totalcartprise(this.cart)
      this.carttotalamount.total = Number(this.carttotalamount.sub_total) + Number(this.carttotalamount.shipping_charge)
      this.updatecartapi(this.cart[index], this.cart[index].id)
    }
    else {
      this.toster.error("Stoke Quantity Error or avialable stoke is (" + productstoke + ")")
    }

  }
  // api call for sub_category_master
  private getproductapi() {
    this.loading = true
    this.dataService.getData("products").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.products = data
          this.getcartapi()
        }
        else {
          console.log("Sub_category_master data not found")
          this.getcartapi()
          this.loading = false
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
      },
      complete: () => {
        this.loading = false
      },
    });
  }
  // checkout
  checkout() {
    let checkoutdata: checkout = {
      cart: this.cart,
      carttotal: this.carttotalamount
    }
    this.sharedService.savecartdata(JSON.stringify(checkoutdata))
    this.router.navigate(['/checkout'])
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  private updatecartapi(data: cart, dcoid: string) {
    this.loading = true
    // console.log(dcoid, data)
    this.dataService.updateDocument("cart", dcoid, data)
      .subscribe({
        next: (docRef) => {
          // console.log(docRef);
          this.toster.success('Cart Item Updated Successfully')
          this.loading = false
        },
        error: (error) => {
          console.error('Error updaing document: ', error.message);
          this.loading = false
        },
        complete: () => {
          this.loading = false
        },
      });
  }
}
