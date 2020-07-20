import { TestBed } from '@angular/core/testing';

import { ViewEditProfileService } from './view-edit-profile.service';

describe('ViewEditProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewEditProfileService = TestBed.get(ViewEditProfileService);
    expect(service).toBeTruthy();
  });
});
