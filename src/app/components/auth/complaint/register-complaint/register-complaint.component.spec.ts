import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComplaintComponent } from './register-complaint.component';

describe('RegisterComplaintComponent', () => {
  let component: RegisterComplaintComponent;
  let fixture: ComponentFixture<RegisterComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComplaintComponent]
    });
    fixture = TestBed.createComponent(RegisterComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
