import { TestBed } from '@angular/core/testing';

import { FootMatesService } from './foot-mates.service';

describe('FootMatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootMatesService = TestBed.get(FootMatesService);
    expect(service).toBeTruthy();
  });
});
