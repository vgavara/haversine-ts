import { DDPoint } from "./ddPoint";
import { SphereBearing } from "./sphereBearing";
import { toRadians } from "./helpers";

const equatorialEarthRadii = {
  [UnitOfDistance.Metre]: 6378137,
  [UnitOfDistance.Kilometre]: 6378.137,
  [UnitOfDistance.Mile]: 3963.191
};

/**
 * Enum for units of distance
 *
 * @readonly
 * @enum {number}
 */
export const enum UnitOfDistance {
  Metre,
  Kilometre,
  Mile
}

/** Haversine formula resolver */
export class Haversine {
  private sphereRadius: number;

  /**
   * Initializes the Haversine resolver.
   *
   * @param {UnitOfDistance} [uod] - Unit of distance (default: kilometre).
   * @param {number} [sphereRadius] - Custom sphere radius (default: equatorial
   *   Earth radius).
   */
  constructor(
    uod: UnitOfDistance = UnitOfDistance.Kilometre,
    sphereRadius?: number
  ) {
    this.sphereRadius = sphereRadius || equatorialEarthRadii[uod];
  }

  /**
   * Calculates the distance between to sphere points defined with decimal
   * degrees coordinates
   *
   * @param {DDPoint} pointA - Point A, in decimal degrees coordinates.
   * @param {DDPoint} pointB - Point B, in decimal degrees coordinates.
   * @returns {number} Distance between the points in the unit of distance set
   *   in the class constructor
   */
  getDistance(pointA: DDPoint, pointB: DDPoint): number {
    const radALatitude = toRadians(pointA.latitude);
    const radALongitude = toRadians(pointA.longitude);
    const radBLatitude = toRadians(pointB.latitude);
    const radBLongitude = toRadians(pointB.longitude);

    const latitudeDelta = radBLatitude - radALatitude;
    const longitudeDelta = radBLongitude - radALongitude;

    const a =
      Math.sin(latitudeDelta / 2) ** 2 +
      Math.cos(radALatitude) *
        Math.cos(radBLatitude) *
        Math.sin(longitudeDelta / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    return c * this.sphereRadius;
  }

  /**
   * Calculates the sphere bearing, or start and end bearings, of the path
   * between two points in a sphere.
   *
   * @param {DDPoint} pointA - Point A, in decimal degrees coordinates.
   * @param {DDPoint} pointB - Point B, in decimal degrees coordinates.
   * @returns {SphereBearing} Bearings of the path from pointA to pointB, in
   *   degrees (0 to 360, clockwise from North).
   */
  getBearing(pointA: DDPoint, pointB: DDPoint): SphereBearing {
    const startBearing = this.getStartBearing(pointA, pointB);
    const endBearing = (this.getStartBearing(pointB, pointA) + 180) % 360;

    return new SphereBearing(startBearing, endBearing);
  }

  /**
   * Calculates the start bearing of the path between two points in a sphere.
   *
   * @param {DDPoint} pointA - Point A, in decimal degrees coordinates.
   * @param {DDPoint} pointB - Point B, in decimal degrees coordinates.
   * @returns {number} Bearing of the path from pointA to pointB, in degrees (0
   *   to 360, clockwise from North).
   */
  private getStartBearing(pointA: DDPoint, pointB: DDPoint): number {
    const radALatitude = toRadians(pointA.latitude);
    const radBLatitude = toRadians(pointB.latitude);
    const deltaLongitude =
      toRadians(pointB.longitude) - toRadians(pointA.longitude);

    const y = Math.sin(deltaLongitude) * Math.cos(radBLatitude);
    const x =
      Math.cos(radALatitude) * Math.sin(radBLatitude) -
      Math.sin(radALatitude) *
        Math.cos(radBLatitude) *
        Math.cos(deltaLongitude);
    const theta = Math.atan2(y, x);

    return ((theta * 180) / Math.PI + 360) % 360;
  }
}
