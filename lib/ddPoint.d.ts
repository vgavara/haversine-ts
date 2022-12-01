import { DMSPoint } from "./dmsPoint";
/** Sphere point defined by a latitude and a longitude in decimal degrees (DD) */
export declare class DDPoint {
  latitude: number;
  longitude: number;
  /**
   * Creates a sphere point object instance.
   *
   * @param {number} latitude - Latitude coordinate in decimal degrees.
   * @param {number} longitude - Longitude coordinate in decimal degrees.
   * @throws Error if any coordinate is out of the range between -180 to 180
   *   degrees.
   */
  constructor(latitude: number, longitude: number);
  /**
   * Gets the equivalent point in degrees minutes seconds (DMS) notation
   *
   * @returns {DMSPoint} Equivalent sphere point defined in degrees minutes
   *   seconds
   */
  toDMSPoint(): DMSPoint;
  /**
   * Gets the equivalent coordinate in degrees minutes seconds (DMS) notation
   *
   * @returns {DMSCoordinate} Equivalent sphere coordinate defined in degrees
   *   minutes seconds
   */
  private toDMSCoordinate;
}
