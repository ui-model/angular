import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { v4 } from 'uuid';
import { nextTick } from '../utils/next-tick';

@Directive({
  selector: '[uiAddUniqueId]',
})
export class AddUniqueIdDirective implements OnInit {

  constructor(private elementRef: ElementRef<Element>, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    if (!element.hasAttribute('id')) {
      nextTick(() => this.renderer.setAttribute(element, 'id', `_${v4()}`));
    }
  }
}
