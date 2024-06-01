import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { category_master } from '../../shared/model/category_master';
import { sub_category_master } from '../../shared/model/sub_category_master';
import { CollectionService } from '../../shared/services/collection.service';
import { products } from '../../shared/model/products';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { varients } from '../../shared/model/varient';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  loading: boolean = true
  category_master: category_master[] = []
  sub_category_master: sub_category_master[] = []
  products: products[] = []
  selected_cat_master: string = "Silver Jewellery"
  selected_sub_cat_master: string = "Necklace"
  filteredproducts: products[] = []
  varient: varients[] = []
  selectedSort: string = '';

  constructor(
    private dataService: CollectionService,
    private toster: ToastrService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.callshareddata()
    this.getcategorymasterapi()
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
      filterproducts: this.filterproductbymastersub(this.products, this.selected_cat_master, this.selected_sub_cat_master),
      selectedproduct: data,
      varient: this.varient.filter((item: varients) => item.sku === data.sku)
    }
    this.sharedService.savedata(JSON.stringify(dataobj))
    this.router.navigate(['/buy'])
  }
  selectmastcat(obj: category_master) {
    this.resetOption()
    this.selected_cat_master = obj.category
    if (this.selected_cat_master === "Silver Jewellery") {
      this.selected_sub_cat_master = "Necklace"
      this.filteredproducts = this.filterproductbymastersub(this.products, this.selected_cat_master, this.selected_sub_cat_master)
    }
    else if (this.selected_cat_master === "Brass Decor") {
      this.selected_sub_cat_master = "Figures"
      this.filteredproducts = this.filterproductbymastersub(this.products, this.selected_cat_master, this.selected_sub_cat_master)

    }
    else {
      console.log('sleetcion is wrong')
    }

  }
  selectsubcat(obj: sub_category_master) {
    this.resetOption()
    this.selected_sub_cat_master = obj.sub_category
    this.filteredproducts = this.filterproductbymastersub(this.products, this.selected_cat_master, this.selected_sub_cat_master)
  }
  // back
  private callshareddata() {
    const data = this.sharedService.getdata();
    if (data !== null) {
      let dataobj = JSON.parse(data)
      console.log(dataobj)
      this.selected_cat_master = dataobj.selectedproduct.category;
      this.selected_sub_cat_master = dataobj.selectedproduct.sub_category;
    } else {
      this.selected_cat_master = "Silver Jewellery";
      this.selected_sub_cat_master = "Necklace";
    }
  }
  // api call for category_master
  private getcategorymasterapi() {
    this.loading = true
    this.dataService.getData("category_master").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.category_master = data
          this.getsubcategorymasterapi()
          // console.log(this.category_master)
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
  // api call for sub_category_master
  private getsubcategorymasterapi() {
    this.dataService.getData("sub_category_master").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.sub_category_master = data
          // console.log(this.filterbysubcat(this.sub_category_master, 'Brass Decor'))
          this.getproductapi()
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
  // api call for sub_category_master
  private getproductapi() {
    this.dataService.getData("products").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.products = data
          // console.log(this.products)
          this.filteredproducts = this.filterproductbymastersub(this.products, this.selected_cat_master, this.selected_sub_cat_master)
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
  // filter function
  filterbysubcat(data: sub_category_master[], mastcat: string) {
    let result: sub_category_master[] = []
    // console.log(data)
    if (data.length != 0) {
      result = data.filter((item: sub_category_master) => item.category === mastcat)
    }
    else {
      // console.log('data not found')
    }
    return result;
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
    return result;
  }

  private ValidatorChecker(data: any) {

    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
  // sorting function
  shortlowtohigh() {
    this.filteredproducts.sort(
      (a, b) => a.min_price - b.min_price
    );
  }
  shorthightolow() {
    this.filteredproducts.sort(
      (a, b) => b.min_price - a.min_price
    );
  }
  shortAZ() {
    this.filteredproducts.sort((a, b) => {
      if (a.productname < b.productname) return -1;
      if (a.productname > b.productname) return 1;
      return 0;
    });
  }
  shortZA() {
    this.filteredproducts.sort((a, b) => {
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
  // order arrangement
  shortsubcatlowtohigh(data: sub_category_master[]) {

    if (data.length != 0) {
      data.sort(
        (a, b) => a.sub_index - b.sub_index
      );
      // console.log(data)
      return data;
    }
    else {
      console.log('data not sorted');
      return []
    }

  }
  // rest sort option
  resetOption() {
    this.selectedSort = ''; // Reset the selected value to an empty string
  }

}
