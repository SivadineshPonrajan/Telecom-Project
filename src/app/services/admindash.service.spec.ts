import { TestBed } from '@angular/core/testing';

import { AdmindashService } from './admindash.service';

describe('AdmindashService', () => {
  let service: AdmindashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmindashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
