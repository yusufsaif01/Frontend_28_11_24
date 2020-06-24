import { TestBed } from '@angular/core/testing';

import { AddEditEmploymentContractService } from './add-edit-employment-contract.service';

describe('AddEditEmploymentContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditEmploymentContractService = TestBed.get(AddEditEmploymentContractService);
    expect(service).toBeTruthy();
  });
});
