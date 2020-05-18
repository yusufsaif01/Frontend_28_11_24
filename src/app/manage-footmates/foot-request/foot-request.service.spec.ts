import { TestBed } from '@angular/core/testing';

import { FootRequestService } from './foot-request.service';

describe('FootRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootRequestService = TestBed.get(FootRequestService);
    expect(service).toBeTruthy();
  });
});
