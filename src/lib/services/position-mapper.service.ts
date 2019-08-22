import { Injectable } from '@angular/core';
import { findParent } from '@ui-model/angular/src/lib/utils/find-parent';
import { screenToSvg } from '@ui-model/angular/src/lib/utils/screen-to-svg';
import { svgToScreen } from '@ui-model/angular/src/lib/utils/svg-to-screen';
import { Point } from '@ui-model/core/src/lib/utils/point';

// SVG 内部的坐标系和外部的坐标系不同，这个映射器用来在两者之间映射，必要时可以覆盖它，以实现自己的映射逻辑
@Injectable({
  providedIn: 'root',
})
export class PositionMapper {
  mapToLocal(element: Element, pos: Point): Point {
    if (element instanceof SVGSVGElement) {
      return screenToSvg(element, pos);
    } else if (element instanceof SVGGraphicsElement) {
      return this.mapToLocal(findParent(element, SVGSVGElement), pos);
    }
    return pos;
  }

  mapToScreen(element: Element, pos: Point): Point {
    if (element instanceof SVGSVGElement) {
      return svgToScreen(element, pos);
    } else if (element instanceof SVGGraphicsElement) {
      return this.mapToScreen(findParent(element, SVGSVGElement), pos);
    }
    return pos;
  }
}

