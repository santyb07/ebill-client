import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintSuccessComponent } from './complaint-success.component';

describe('ComplaintSuccessComponent', () => {
  let component: ComplaintSuccessComponent;
  let fixture: ComponentFixture<ComplaintSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintSuccessComponent]
    });
    fixture = TestBed.createComponent(ComplaintSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
