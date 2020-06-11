import { TestBed } from '@angular/core/testing';

import { FootPlayerService } from './foot-player.service';

describe('FootPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootPlayerService = TestBed.get(FootPlayerService);
    expect(service).toBeTruthy();
  });
});
