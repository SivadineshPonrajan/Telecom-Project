import { TestBed } from '@angular/core/testing';

import { AddnewcustomerService } from './addnewcustomer.service';

describe('AddnewcustomerService', () => {
  let service: AddnewcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
