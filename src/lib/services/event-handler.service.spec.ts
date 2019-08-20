import { TestBed } from '@angular/core/testing';

import { EventHandler } from './event-handler.service';

describe('EventHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventHandler = TestBed.get(EventHandler);
    expect(service).toBeTruthy();
  });
});
