import { Component } from '@angular/core';
import { CollectionService } from '../../shared/services/collection.service';
import { testimonnials } from '../../shared/model/testimonials';
import { workinghours } from '../../shared/model/workinghours';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  loading: boolean = false
  testimonials: testimonnials[] = []

  constructor(
    private collection: CollectionService
  ) { }
  ngOnInit() {
    this.gettestimonials()
    this.scrole()
  }
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  // api call for testimonials
  private gettestimonials() {
    this.loading = true
    this.collection.getData("testimonials").subscribe({
      next: (data: testimonnials[]) => {
        if (data.length != 0) {
          this.testimonials = data
          // console.log(this.testimonials)
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

  ngOnDestroy() {

  }
}
