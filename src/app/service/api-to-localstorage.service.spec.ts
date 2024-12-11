import { TestBed } from '@angular/core/testing';

import { ApiToLocalstorageService } from './api-to-localstorage.service';

describe('ApiToLocalstorageService', () => {
  let service: ApiToLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiToLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
