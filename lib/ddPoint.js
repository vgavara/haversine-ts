"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDPoint = void 0;
const dmsPoint_1 = require("./dmsPoint");
/** Sphere point defined by a latitude and a longitude in decimal degrees (DD) */
class DDPoint {
  /**
   * Creates a sphere point object instance.
   *
   * @param {number} latitude - Latitude coordinate in decimal degrees.
   * @param {number} longitude - Longitude coordinate in decimal degrees.
   * @throws Error if any coordinate is out of the range between -180 to 180
   *   degrees.
   */
  constructor(latitude, longitude) {
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
      throw new Error(
        "Coordinate(s) out of range: they must be in the range -180 to 180"
      );
    this.latitude = latitude;
    this.longitude = longitude;
  }
  /**
   * Gets the equivalent point in degrees minutes seconds (DMS) notation
   *
   * @returns {DMSPoint} Equivalent sphere point defined in degrees minutes
   *   seconds
   */
  toDMSPoint() {
    const dmsLatitude = this.toDMSCoordinate(this.latitude);
    const dmsLongitude = this.toDMSCoordinate(this.longitude);
    return new dmsPoint_1.DMSPoint(dmsLatitude, dmsLongitude);
  }
  /**
   * Gets the equivalent coordinate in degrees minutes seconds (DMS) notation
   *
   * @returns {DMSCoordinate} Equivalent sphere coordinate defined in degrees
   *   minutes seconds
   */
  toDMSCoordinate(ddCoordinate) {
    const absDDCoordinate = Math.abs(ddCoordinate);
    const degrees = Math.floor(absDDCoordinate);
    const minutes = Math.floor((absDDCoordinate - degrees) * 60);
    const seconds = (absDDCoordinate - degrees - minutes / 60) * 3600;
    return new dmsPoint_1.DMSCoordinate(
      ddCoordinate >= 0 ? degrees : -degrees,
      minutes,
      seconds
    );
  }
}
exports.DDPoint = DDPoint;
