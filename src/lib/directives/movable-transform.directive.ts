import { Directive, HostBinding } from '@angular/core';
import { MovableDirective } from '@ui-model/angular/src/lib/directives/movable.directive';

@Directive({
  selector: '[uiMovableTransform]',
})
export class MovableTransformDirective {

  constructor(private movable: MovableDirective) {
  }

  @HostBinding('style.transform')
  get transform(): string {
    return `translate(${this.movable.offset.x}px,${this.movable.offset.y}px)`;
  }
}
