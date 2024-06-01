import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-img-pop-up',
  templateUrl: './img-pop-up.component.html',
  styleUrl: './img-pop-up.component.css'
})
export class ImgPopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }

}
