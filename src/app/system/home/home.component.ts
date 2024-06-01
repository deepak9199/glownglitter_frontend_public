import { Component } from '@angular/core';
import { category_master } from '../../shared/model/category_master';
import { sub_category_master } from '../../shared/model/sub_category_master';
import { CollectionService } from '../../shared/services/collection.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { testimonnials } from '../../shared/model/testimonials';
import { workinghours } from '../../shared/model/workinghours';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading: boolean = false
  category_master: category_master[] = []
  sub_category_master: sub_category_master[] = []
  testimonials: testimonnials[] = []
  workinghours: workinghours = {
    notice: '',
    sunday: '',
    website_background: '',
    weekday: ''
  }
  customOptions: any = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    mouseDrag: true,
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
      1000: {
        items: 4
      }
    },
    nav: !this.isMobileScreen(window.innerWidth),
  };
  constructor(
    private dataService: CollectionService,
    private toster: ToastrService,
    private sharedService: SharedService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getcategorymasterapi()
    this.scrole()
  }
  // select data
  selectdata(obj: sub_category_master) {
    // console.log(obj)
    let dataobj = {
      filterproducts: {},
      selectedproduct: obj
    }
    this.sharedService.savedata(JSON.stringify(dataobj));
    this.router.navigate(['/product']);
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
          // console.log('call done')
          this.gettestimonials()
          this.loading = false;
        }
        else {
          console.log("Sub_category_master data not found")
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

  // api call for testimonials
  private gettestimonials() {
    this.dataService.getData("testimonials").subscribe({
      next: (data: testimonnials[]) => {
        if (data.length != 0) {
          this.testimonials = data
          // console.log(this.testimonials)
          this.getworkinhours()
          this.loading = false;
        }
        else {
          console.log("testimonials data not found")
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
  // api call for workinghours
  private getworkinhours() {
    this.dataService.getData("workinghours").subscribe({
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
  // sorting function
  shortlowtohigh(data: sub_category_master[]) {

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
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 655) {
      return true;
    } else {
      return false;
    }
  }
}
