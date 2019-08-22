import { Point } from '@ui-model/core';

export function screenToSvg(svg: SVGSVGElement, point: Point): Point {
  const p = svg.createSVGPoint();
  p.x = point.x;
  p.y = point.y;
  const innerPoint = p.matrixTransform(svg.getScreenCTM().inverse());
  return new Point(innerPoint.x, innerPoint.y);
}
