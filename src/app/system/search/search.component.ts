import { Component } from '@angular/core';
import { products } from '../../shared/model/products';
import { CollectionService } from '../../shared/services/collection.service';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { varients } from '../../shared/model/varient';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  loading: boolean = false
  // Sample array of objects to search through
  items: products[] = [];
  varient: varients[] = []
  // Variable to hold filtered items
  filteredItems: products[] = [];
  filterproducts: products[] = []
  constructor(private dataService: CollectionService, private sharedservice: SharedService, private router: Router) { }

  ngOnInit() {
    this.getproductapi()
    this.gettrigertrefreshsearch()
    this.scrole()
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
    const data = this.sharedservice.getsearchdata();
    if (data !== null) {
      this.filterItems(data)
    } else {
      console.log('product data not found')
      this.loading = false
    }
  }
  // Method to filter items based on search query
  filterItems(searchQuery: string) {
    if (!searchQuery.trim()) {
      // If search query is empty, show all items
      this.filteredItems = this.items;
      return;
    }
    // console.log(this.filteredItems)
    this.filteredItems = this.items.filter(item => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key as keyof products]; // Asserting key as keyof Item
          if (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
    // console.log(this.filteredItems)
  }

  // api call for sub_category_master
  private getproductapi() {
    this.loading = true
    this.dataService.getData("products").subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.items = data
          this.getvarientapi()
          this.callshareddata()
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
  private gettrigertrefreshsearch() {
    this.sharedservice.functionTriggerObservablesearch.subscribe(() => {
      this.getproductapi()
    });
  }
  // sorting function
  shortlowtohigh() {
    this.filteredItems.sort(
      (a, b) => a.min_price - b.min_price
    );
  }
  shorthightolow() {
    this.filteredItems.sort(
      (a, b) => b.min_price - a.min_price
    );
  }
  shortAZ() {
    this.filteredItems.sort((a, b) => {
      if (a.productname < b.productname) return -1;
      if (a.productname > b.productname) return 1;
      return 0;
    });
  }
  shortZA() {
    this.filteredItems.sort((a, b) => {
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
  // selected product
  selectdata(data: products) {
    // console.log(data)
    let dataobj = {
      filterproducts: this.filterproductbymastersub(this.items, data.category, data.sub_category),
      selectedproduct: data,
      varient: this.varient.filter((item: varients) => item.sku === data.sku)
    }
    this.sharedservice.savedata(JSON.stringify(dataobj))
    this.router.navigate(['/buy'])
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
}
