import { TestBed } from '@angular/core/testing';

import { ViewReportCardService } from './view-report-card.service';

describe('ViewReportCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewReportCardService = TestBed.get(ViewReportCardService);
    expect(service).toBeTruthy();
  });
});
