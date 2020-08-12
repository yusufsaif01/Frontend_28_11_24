import { TestBed } from '@angular/core/testing';

import { ManageReportCardService } from './manage-report-card.service';

describe('ManageReportCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageReportCardService = TestBed.get(ManageReportCardService);
    expect(service).toBeTruthy();
  });
});
