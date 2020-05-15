import { TestBed } from '@angular/core/testing';

import { ViewProfileService } from './view-profile.service';

describe('ViewProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewProfileService = TestBed.get(ViewProfileService);
    expect(service).toBeTruthy();
  });
});
