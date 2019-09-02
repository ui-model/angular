import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Distance, Point } from '@ui-model/core';
import { PositionMapper } from '../services/position-mapper.service';

@Directive({
  selector: '[uiMovable]',
  exportAs: 'uiMovable',
})
export class MovableDirective {
  constructor(private elementRef: ElementRef<Element>, private mapper: PositionMapper) {
  }

  @Output('uiMoveStart') start = new EventEmitter<Distance>();
  @Output('uiMoving') move = new EventEmitter<Distance>();
  @Output('uiMoveStop') stop = new EventEmitter<Distance>();
  offset = new Distance();
  private previousPoint = new Point();

  private _moving = false;

  get moving(): boolean {
    return this._moving;
  }

  get element(): Element {
    return this.elementRef.nativeElement;
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent): void {
    if (!isMajorButton(event)) {
      return;
    }

    const target = event.target as Element;
    target.setPointerCapture(event.which);
    event.stopPropagation();
    this._moving = true;
    this.previousPoint = this.svgPos(event.clientX, event.clientY);
    this.start.emit(this.offset);
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(event: MouseEvent): void {
    if (!isMajorButton(event)) {
      return;
    }
    const target = event.target as Element;
    target.releasePointerCapture(event.which);
    event.stopPropagation();
    this._moving = false;
    this.stop.emit(this.offset);
  }

  @HostListener('mousemove', ['$event'])
  mouseMove(event: MouseEvent): void {
    if (!isMajorButton(event)) {
      return;
    }
    event.stopPropagation();
    if (this._moving) {
      const currentPoint = this.svgPos(event.clientX, event.clientY);
      const deltaX = currentPoint.x - this.previousPoint.x;
      const deltaY = currentPoint.y - this.previousPoint.y;
      this.offset.x += deltaX;
      this.offset.y += deltaY;
      this.previousPoint = currentPoint;
      this.move.emit(new Distance(deltaX, deltaY));
    }
  }

  svgPos(x: number, y: number): Point {
    return this.mapper.mapToLocal(this.element, new Point(x, y));
  }
}

function isMajorButton(event: MouseEvent): boolean {
  return event.button === 0;
}
