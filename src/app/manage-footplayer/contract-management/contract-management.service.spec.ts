import { TestBed } from '@angular/core/testing';

import { ContractManagementService } from './contract-management.service';

describe('ContractManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractManagementService = TestBed.get(
      ContractManagementService
    );
    expect(service).toBeTruthy();
  });
});
