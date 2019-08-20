import { TestBed } from '@angular/core/testing';

import { EventBus } from './event-bus.service';

describe('EventBus', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventBus = TestBed.get(EventBus);
    expect(service).toBeTruthy();
  });
});
