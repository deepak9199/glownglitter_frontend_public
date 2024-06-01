import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { products } from '../../shared/model/products';
import { CollectionService } from '../../shared/services/collection.service';
import { Router } from '@angular/router';
import { varients } from '../../shared/model/varient';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productshateddata: products = {
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
  varient: varients[] = []
  loading: boolean = false
  private products: products[] = []
  filterproducts: products[] = []
  constructor(private sharedService: SharedService, private dataService: CollectionService, private router: Router) { }

  ngOnInit(): void {
    this.callshareddata()
    this.scrole()
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  // selected product
  selectdata(data: products) {
    // console.log(data)
    let dataobj = {
      filterproducts: this.filterproducts,
      selectedproduct: data,
      varient: this.varient.filter((item: varients) => item.sku === data.sku)
    }
    this.sharedService.savedata(JSON.stringify(dataobj))
    this.router.navigate(['/buy'])
  }
  //  call shared data function
  callshareddata() {
    const data = this.sharedService.getdata();
    if (data !== null) {
      let dataobj = JSON.parse(data)
      this.productshateddata = JSON.parse(data).selectedproduct;
      // console.log(this.productshateddata)
      this.getproductapi()
    } else {
      console.log('product data not found')
    }
  }
  // api call for sub_category_master
  private getproductapi() {
    this.loading = true
    this.dataService.getData("products").subscribe({
      next: (data: products[]) => {
        if (data.length != 0) {
          this.products = data
          // console.log(this.products)
          this.filterproducts = this.filterproductbymastersub(this.products, this.productshateddata.category, this.productshateddata.sub_category)
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
        this.loading = false
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
          this.varient = data
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
  // sorting function
  shortlowtohigh() {
    this.filterproducts.sort(
      (a, b) => a.min_price - b.min_price
    );
  }
  shorthightolow() {
    this.filterproducts.sort(
      (a, b) => b.min_price - a.min_price
    );
  }
  shortAZ() {
    this.filterproducts.sort((a, b) => {
      if (a.productname < b.productname) return -1;
      if (a.productname > b.productname) return 1;
      return 0;
    });
  }
  shortZA() {
    this.filterproducts.sort((a, b) => {
      if (a.productname > b.productname) return -1;
      if (a.productname < b.productname) return 1;
      return 0;
    });
  }
  // 
  shortdata(data: any) {
    if (data === 'two') {
      this.shortAZ()
    } else if (data === 'three') {
      this.shortZA()
    } else if (data === 'four') {
      this.shortlowtohigh()
    } else if (data === 'five') {
      this.shorthightolow()
    } else {
      console.log("invelid selection")
    }
  }
}
