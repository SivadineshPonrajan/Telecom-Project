import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewCustomerComponent } from './admin-new-customer.component';

describe('AdminNewCustomerComponent', () => {
  let component: AdminNewCustomerComponent;
  let fixture: ComponentFixture<AdminNewCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
