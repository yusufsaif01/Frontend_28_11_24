import { TestBed } from '@angular/core/testing';

import { GalleryListingService } from './gallery-listing.service';

describe('GalleryListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryListingService = TestBed.get(GalleryListingService);
    expect(service).toBeTruthy();
  });
});
