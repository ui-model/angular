import { Injectable, InjectionToken, Injector } from '@angular/core';
import { BaseEvent } from './base-event';
import { EventHandler } from './event-handler.service';

export const EVENT_HANDLERS = new InjectionToken<EventHandler[]>('EVENT-HANDLERS');

@Injectable()
export class EventBus {
  constructor(private injector: Injector) {
  }

  private handlers: EventHandler[] = [];

  register(handler: EventHandler): void {
    this.handlers.push(handler);
  }

  revoke(handler: EventHandler): void {
    const index = this.handlers.indexOf(handler);
    this.handlers.splice(index, 1);
  }

  publish<T extends BaseEvent>(value: T): void {
    const handlers = this.injector.get(EVENT_HANDLERS);
    [...this.handlers, ...handlers].forEach(it => {
      if (it.type === value.type) {
        it.handle(value);
      }
    });
  }
}
