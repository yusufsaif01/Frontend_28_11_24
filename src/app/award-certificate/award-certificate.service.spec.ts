import { TestBed } from '@angular/core/testing';

import { AwardCertificateService } from './award-certificate.service';

describe('AwardCertificateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwardCertificateService = TestBed.get(AwardCertificateService);
    expect(service).toBeTruthy();
  });
});
