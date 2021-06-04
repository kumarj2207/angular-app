import { TestBed } from '@angular/core/testing';

import { EmployeeInMemDataService } from './employee-in-mem-data.service';

describe('EmployeeInMemDataService', () => {
  let service: EmployeeInMemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeInMemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
