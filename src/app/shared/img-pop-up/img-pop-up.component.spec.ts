import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPopUpComponent } from './img-pop-up.component';

describe('ImgPopUpComponent', () => {
  let component: ImgPopUpComponent;
  let fixture: ComponentFixture<ImgPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
