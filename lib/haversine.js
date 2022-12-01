"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Haversine = void 0;
const helpers_1 = require("./helpers");
const equatorialEarthRadii = {
  [0 /* UnitOfDistance.Metre */]: 6378137,
  [1 /* UnitOfDistance.Kilometre */]: 6378.137,
  [2 /* UnitOfDistance.Mile */]: 3963.191
};
/** Haversine formula resolver */
class Haversine {
  /**
   * Initializes the Haversine resolver.
   *
   * @param {UnitOfDistance} [uod] - Unit of distance (default: kilometre).
   * @param {number} [sphereRadius] - Custom sphere radius (default: equatorial
   *   Earth radius).
   */
  constructor(uod = 1 /* UnitOfDistance.Kilometre */, sphereRadius) {
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
  getDistance(pointA, pointB) {
    const radALatitude = (0, helpers_1.toRadians)(pointA.latitude);
    const radALongitude = (0, helpers_1.toRadians)(pointA.longitude);
    const radBLatitude = (0, helpers_1.toRadians)(pointB.latitude);
    const radBLongitude = (0, helpers_1.toRadians)(pointB.longitude);
    const latitudeDelta = radBLatitude - radALatitude;
    const longitudeDelta = radBLongitude - radALongitude;
    const a =
      Math.pow(Math.sin(latitudeDelta / 2), 2) +
      Math.cos(radALatitude) *
        Math.cos(radBLatitude) *
        Math.pow(Math.sin(longitudeDelta / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    return c * this.sphereRadius;
  }
}
exports.Haversine = Haversine;
