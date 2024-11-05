import { TestBed } from '@angular/core/testing';

import { ApiMateriasService } from './api-materias.service';

describe('ApiMateriasService', () => {
  let service: ApiMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
