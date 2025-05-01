import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaymentComponent } from './credit-payment.component';

describe('CreditPaymentComponent', () => {
  let component: CreditPaymentComponent;
  let fixture: ComponentFixture<CreditPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditPaymentComponent]
    });
    fixture = TestBed.createComponent(CreditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
