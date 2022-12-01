import { DDPoint } from "./ddPoint";
/** Latitude/Longitude coordinate defined in degrees minutes seconds (DMS) */
export declare class DMSCoordinate {
  degrees: number;
  minutes: number;
  seconds: number;
  /**
   * Initializes a DMSCoordinate object instance
   *
   * @param {number} degrees Coordinate degrees, from -180 to 180
   * @param {number} minutes Coordinate minutes, from 0 to <60
   * @param {number} seconds Coordinate seconds, from 0 to <60
   * @throws Error if degrees, minutes or seconds are out of range
   */
  constructor(degrees: number, minutes: number, seconds: number);
}
/**
 * Sphere point defined by a latitude and a longitude in degrees minutes seconds
 * (DMS)
 */
export declare class DMSPoint {
  latitude: DMSCoordinate;
  longitude: DMSCoordinate;
  /**
   * Creates a sphere point object instance.
   *
   * @param {DMSCoordinate} latitude - Latitude coordinate in degrees minutes
   *   seconds.
   * @param {DMSCoordinate} longitude - Longitude coordinate in degrees minutes
   *   seconds.
   * @throws Error if latitude degrees are out of range (-90 to 90)
   */
  constructor(latitude: DMSCoordinate, longitude: DMSCoordinate);
  /**
   * Gets the equivalent point in decimal degrees notation
   *
   * @returns {DDPoint} Equivalent sphere point defined in decimal degrees
   */
  toDDPoint(): DDPoint;
}
