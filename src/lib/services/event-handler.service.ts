import { BaseEvent } from './base-event';

export abstract class EventHandler {
  type: string;

  abstract handle(event: BaseEvent): void;
}
