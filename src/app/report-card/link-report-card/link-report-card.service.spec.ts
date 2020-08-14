import { TestBed } from '@angular/core/testing';

import { LinkReportCardService } from './link-report-card.service';

describe('LinkReportCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkReportCardService = TestBed.get(LinkReportCardService);
    expect(service).toBeTruthy();
  });
});
