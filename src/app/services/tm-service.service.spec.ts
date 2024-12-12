import { TestBed } from '@angular/core/testing';

import { TmServiceService } from './tm-service.service';

describe('TmServiceService', () => {
  let service: TmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
