import { TestBed } from '@angular/core/testing';

import { CrudAPIService } from './crud-api.service';

describe('CrudAPIService', () => {
  let service: CrudAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
