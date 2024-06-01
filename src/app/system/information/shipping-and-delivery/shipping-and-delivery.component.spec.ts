import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAndDeliveryComponent } from './shipping-and-delivery.component';

describe('ShippingAndDeliveryComponent', () => {
  let component: ShippingAndDeliveryComponent;
  let fixture: ComponentFixture<ShippingAndDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingAndDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
