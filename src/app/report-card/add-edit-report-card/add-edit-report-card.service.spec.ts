import { TestBed } from '@angular/core/testing';

import { AddEditReportCardService } from './add-edit-report-card.service';

describe('AddEditReportCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditReportCardService = TestBed.get(AddEditReportCardService);
    expect(service).toBeTruthy();
  });
});
