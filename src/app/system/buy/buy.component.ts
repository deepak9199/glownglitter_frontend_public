import { Component } from '@angular/core';
import { Related, products } from '../../shared/model/products';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from '../../shared/services/collection.service';
import { cart } from '../../shared/model/cart';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { varients } from '../../shared/model/varient';
import { MatDialog } from '@angular/material/dialog';
import { ImgPopUpComponent } from '../../shared/img-pop-up/img-pop-up.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {

  productshareddata: products = {
    min_price: 0,
    length: '',
    fastening: '',
    sku: '',
    description: '',
    featured: false,
    width: '',
    category: '',
    productname: '',
    imageUrl: [],
    stocks: 0,
    sub_category: '',
    date: {
      "seconds": 0,
      "nanoseconds": 0
    },
    color_varient: '',
    related: []
  }
  filteredproducts: products[] = []
  loading: boolean = false
  relatedproducts: products[] = []
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      840: {
        items: 3
      }
    },
    nav: true,
  };
  selectedimgurl: string = ""
  varient: varients[] = []
  prodvar: varients[] = []
  product: products[] = []
  constructor(
    private collection: CollectionService,
    private sharedService: SharedService,
    private route: Router,
    private sharedservice: SharedService,
    public dialog: MatDialog,
    private toster: ToastrService,
    private tokenstorage: TokenStorageService, private dataService: CollectionService) { }

  ngOnInit(): void {
    this.callshareddata()
    this.getproductapi()
    this.scrole()
  }
  openDialog(image: string): void {
    const dialogRef = this.dialog.open(ImgPopUpComponent, {
      data: { imagesselected: image, imagedata: this.productshareddata.imageUrl }
    });
  }
  // add to cart function 
  addtocart() {
    let token = this.tokenstorage.getToken()
    if ((this.ValidatorChecker(token))) {
      if (this.checkStokeaviable(this.productshareddata.stocks)) {
        let cart: cart = {
          sub_category: this.productshareddata.sub_category,
          userId: this.tokenstorage.getUser().uid,
          productname: this.productshareddata.productname,
          imageUrl: this.productshareddata.imageUrl[0],
          quantity: 1,
          id: '',
          stocks: this.productshareddata.stocks,
          varientId: '',
          price: this.productshareddata.min_price,
          category: this.productshareddata.category,
          sku: this.productshareddata.sku
        }
        // console.log(cart)
        this.addcartapi(cart)
      }
      else {
        this.toster.error('Item Out of Stoke')
      }

    }
    else {
      this.route.navigate(['/login']).then(() => {
        this.toster.error("Need To Login")
      })
    }
  }
  // next product
  nextproduct() {
    let index: number = this.filteredproducts.findIndex((item: products) => item.sku === this.productshareddata.sku)
    if ((index >= 0) && (index < this.filteredproducts.length - 1)) {
      let dataobj = {
        filterproducts: this.filteredproducts,
        selectedproduct: this.filteredproducts[index + 1]
      }
      this.sharedService.savedata(JSON.stringify(dataobj))
      this.ngOnInit()
    }
    else {
      this.toster.error("THAT'S ALL FOR NOW , MORE COMING SOON!")
    }
  }
  // previous product
  previousproduct() {
    let index: number = this.filteredproducts.findIndex((item: products) => item.sku === this.productshareddata.sku)
    if ((index > 0) && (index < this.filteredproducts.length)) {
      let dataobj = {
        filterproducts: this.filteredproducts,
        selectedproduct: this.filteredproducts[index - 1]
      }
      this.sharedService.savedata(JSON.stringify(dataobj))
      this.ngOnInit()
    }
    else {
      this.toster.error("THAT'S ALL FOR NOW , MORE COMING SOON!")
    }
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  //  call shared data function
  private callshareddata() {
    const data = this.sharedService.getdata();
    if (data !== null) {
      let dataobj = JSON.parse(data)
      this.filteredproducts = dataobj.filterproducts
      this.productshareddata = dataobj.selectedproduct;
      // console.log(this.productshareddata)
      this.selectedimgurl = this.productshareddata.imageUrl[0]
      if (!this.ValidatorChecker(dataobj.varient)) {
        this.varient = []
      }
      else {
        this.varient = dataobj.varient
      }
      if (this.ValidatorChecker(this.productshareddata.related)) {
        if (this.productshareddata.related.length != 0) {
          this.loading = true
          this.relatedproducts.length = 0;
          this.productshareddata.related.map((item: Related, index: number) => {
            let id: string = item._delegate._key.path.segments[6]
            this.getproductbyidapi(id)
          })
        }
        else {
          console.log("related data not found")
          this.loading = false
        }
      }
      else {
        console.log("related data is undefined")
      }

    } else {
      console.log('product data not found')
      this.loading = false
    }
  }
  formatDescription(description: string): string {
    // console.log(description)
    if (!description) return '';
    return description.replace(/,/g, "<br>");
  }
  selectimg(url: string) {
    this.selectedimgurl = url
  }
  // add auther cart api
  private addcartapi(data: cart) {
    this.loading = true
    this.collection.addDocumnet("cart", data)
      .subscribe({
        next: (docRef) => {
          // console.log('Document added with ID: ', docRef.id);
          data.id = docRef.id
          this.updatecartapi(data, docRef.id)
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
  private updatecartapi(data: cart, dcoid: string) {
    this.loading = true
    // console.log(dcoid, data)
    this.collection.updateDocument("cart", dcoid, data)
      .subscribe({
        next: (docRef) => {
          // console.log(docRef);
          this.toster.success('Item Added to Cart Successfully')
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
  ValidatorChecker(data: any) {

    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
  checkStokeaviable(data: any): boolean {
    // console.log(data)
    if (this.ValidatorChecker(data)) {
      // console.log(this.productshareddata.stocks)
      if (this.productshareddata.stocks != 0) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  // api call for sub_category_master
  private getproductbyidapi(id: string) {
    this.loading = true
    // console.log(id)
    this.dataService.getDocumentById("products", id).subscribe({
      next: (data) => {
        this.relatedproducts.push(data)
        this.loading = false
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    });
  }
  // selected product
  selectdata(data: products) {
    // console.log(data)
    let dataobj = {
      filterproducts: this.filterproductbymastersub(this.product, data.category, data.sub_category),
      selectedproduct: data,
      varient: this.prodvar.filter((item: varients) => item.sku === data.sku)
    }

    this.sharedService.savedata(JSON.stringify(dataobj))
    this.ngOnInit()
  }
  selectvarient(data: varients, index: number) {
    this.productshareddata.min_price = data.price
    this.varient.map((item: varients) => {
      if (item.price == data.price) {
        item.activate = true
        // console.log('true')
      }
      else {
        item.activate = false
        // console.log('false')
      }
    })
  }
  // filter product
  filterproductbymastersub(data: products[], mastcat: string, subcat: string) {
    let result: products[] = []
    // console.log(data)
    if (data.length != 0) {
      result = data.filter((item: products) => (item.category === mastcat) && (item.sub_category === subcat))
    }
    else {
      // console.log('data not found')
    }
    // console.log(result)
    return result;
  }
  // api call for sub_category_master
  private getproductapi() {
    this.dataService.getData("products").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.product = data
          this.getvarientapi()
          this.loading = false
        }
        else {
          console.log("Sub_category_master data not found")
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
  // api call for sub_category_master
  private getvarientapi() {
    this.loading = true
    this.dataService.getData("varients").subscribe({
      next: (data: varients[]) => {
        if (data.length != 0) {
          // console.log(data)
          this.prodvar = data
          this.loading = false
        }
        else {
          console.log("varients data not found")
          this.loading = false
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
      complete: () => {
        this.loading = false

      },
    });
  }

}
