import { DDPoint } from "./ddPoint";
/**
 * Enum for units of distance
 *
 * @readonly
 * @enum {number}
 */
export declare const enum UnitOfDistance {
  Metre = 0,
  Kilometre = 1,
  Mile = 2
}
/** Haversine formula resolver */
export declare class Haversine {
  private sphereRadius;
  /**
   * Initializes the Haversine resolver.
   *
   * @param {UnitOfDistance} [uod] - Unit of distance (default: kilometre).
   * @param {number} [sphereRadius] - Custom sphere radius (default: equatorial
   *   Earth radius).
   */
  constructor(uod?: UnitOfDistance, sphereRadius?: number);
  /**
   * Calculates the distance between to sphere points defined with decimal
   * degrees coordinates
   *
   * @param {DDPoint} pointA - Point A, in decimal degrees coordinates.
   * @param {DDPoint} pointB - Point B, in decimal degrees coordinates.
   * @returns {number} Distance between the points in the unit of distance set
   *   in the class constructor
   */
  getDistance(pointA: DDPoint, pointB: DDPoint): number;
}
