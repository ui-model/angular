import { Type } from '@angular/core';

export function findParent<T extends Element>(element: Element, type: Type<T>): T {
  if (!element) {
    return undefined;
  } else if (element instanceof SVGSVGElement) {
    return element as any;
  } else {
    return findParent(element.parentElement, type);
  }
}
