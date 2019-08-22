import { ContentChild, Directive, HostBinding } from '@angular/core';
import { MovableDirective } from './movable.directive';

@Directive({
  selector: '[uiMovableTransform]',
})
export class MovableTransformDirective {
  @ContentChild(MovableDirective, { static: false })
  movable: MovableDirective;

  @HostBinding('style.transform')
  get transform(): string {
    if (!this.movable) {
      return '';
    }
    return `translate(${this.movable.offset.x}px,${this.movable.offset.y}px)`;
  }
}
