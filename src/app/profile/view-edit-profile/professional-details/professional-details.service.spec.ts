import { TestBed } from '@angular/core/testing';

import { ProfessionalDetailsService } from './professional-details.service';

describe('ProfessionalDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessionalDetailsService = TestBed.get(
      ProfessionalDetailsService
    );
    expect(service).toBeTruthy();
  });
});
