import { TestBed } from '@angular/core/testing';

import { PositionMapper } from './position-mapper.service';

describe('PositionMapper', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionMapper = TestBed.get(PositionMapper);
    expect(service).toBeTruthy();
  });
});
