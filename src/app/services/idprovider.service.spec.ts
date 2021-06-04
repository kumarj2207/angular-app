import { TestBed } from '@angular/core/testing';

import { IdproviderService } from './idprovider.service';

describe('IdproviderService', () => {
  let service: IdproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
