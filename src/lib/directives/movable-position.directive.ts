import { ContentChild, Directive, HostBinding } from '@angular/core';
import { MovableDirective } from './movable.directive';

@Directive({
  selector: '[uiMovablePosition]',
})
export class MovablePositionDirective {
  @ContentChild(MovableDirective, { static: false })
  movable: MovableDirective;

  @HostBinding('style.left.px')
  get left(): number {
    if (!this.movable) {
      return;
    }
    return this.movable.offset.x;
  }

  @HostBinding('style.top.px')
  get top(): number {
    if (!this.movable) {
      return;
    }
    return this.movable.offset.y;
  }
}
