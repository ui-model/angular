import { Point } from '@ui-model/core';

export function svgToScreen(svg: SVGSVGElement, point: Point): Point {
  const p = svg.createSVGPoint();
  p.x = point.x;
  p.y = point.y;
  const innerPoint = p.matrixTransform(svg.getScreenCTM());
  return new Point(innerPoint.x, innerPoint.y);
}
