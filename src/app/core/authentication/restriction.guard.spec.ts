import { TestBed, async, inject } from '@angular/core/testing';

import { RestrictionGuard } from './restriction.guard';

describe('RestrictionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestrictionGuard]
    });
  });

  it('should ...', inject([RestrictionGuard], (guard: RestrictionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
