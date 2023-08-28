import { TestBed } from '@angular/core/testing';

import { GallerySingleService } from './gallery-single.service';

describe('GallerySingleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GallerySingleService = TestBed.get(GallerySingleService);
    expect(service).toBeTruthy();
  });
});
