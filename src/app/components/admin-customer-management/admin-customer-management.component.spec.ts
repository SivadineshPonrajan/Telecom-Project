import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerManagementComponent } from './admin-customer-management.component';

describe('AdminCustomerManagementComponent', () => {
  let component: AdminCustomerManagementComponent;
  let fixture: ComponentFixture<AdminCustomerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
