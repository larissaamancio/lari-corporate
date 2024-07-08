import { TestBed } from '@angular/core/testing';

import { FilialService } from './filial.service';

describe('FilialServiceService', () => {
  let service: FilialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
