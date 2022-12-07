import { DDPoint } from "./ddPoint";
import { SphereBearing } from "./sphereBearing";
import { toRadians, toDegrees } from "./helpers";

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
   * @param {DDPoint} startPoint - Start point, in decimal degrees coordinates.
   * @param {DDPoint} endPoint - End point, in decimal degrees coordinates.
   * @returns {SphereBearing} Bearings of the path from startPoint to endPoint,
   *   in degrees (0 to 360, clockwise from North).
   */
  getBearing(startPoint: DDPoint, endPoint: DDPoint): SphereBearing {
    const startBearing = this.getStartBearing(startPoint, endPoint);
    const endBearing = (this.getStartBearing(endPoint, startPoint) + 180) % 360;

    return new SphereBearing(startBearing, endBearing);
  }

  /**
   * Calculates the coordinates of an end point given an start point, a bearing
   * and a distance.
   *
   * @param {DDPoint} startPoint - Start point, in decimal degrees coordinates.
   * @param {number} bearing Bearing to the end point, in degrees (0 to 360,
   *   clockwise from North).
   * @param {number} distance - Distance from the start point to the targetted
   *   point, using as unit of measure that set in the class constructor
   *   (metres, kilometres or miles).
   * @returns {DDPoint} End point, in decimal degrees coordinates.
   */
  getPoint(startPoint: DDPoint, bearing: number, distance: number): DDPoint {
    if (distance < 0)
      throw new Error("Distance out of range: Must be equal of higher than 0");
    if (bearing < 0 || bearing >= 360)
      throw new Error("Bearing out of range: Must be between 0 and < 360");

    const startLatitude = toRadians(startPoint.latitude);
    const startLongitude = toRadians(startPoint.longitude);
    const angularDistance = distance / this.sphereRadius;
    const startBearing = toRadians(bearing);

    const endLatitude = Math.asin(
      Math.sin(startLatitude) * Math.cos(angularDistance) +
        Math.cos(startLatitude) *
          Math.sin(angularDistance) *
          Math.cos(startBearing)
    );
    const endLongitude =
      startLongitude +
      Math.atan2(
        Math.sin(startBearing) *
          Math.sin(angularDistance) *
          Math.cos(startLatitude),
        Math.cos(angularDistance) -
          Math.sin(startLatitude) * Math.sin(endLatitude)
      );

    return new DDPoint(toDegrees(endLatitude), toDegrees(endLongitude));
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
