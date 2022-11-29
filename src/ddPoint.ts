import { DMSCoordinate, DMSPoint } from "./dmsPoint";

/** Sphere point defined by a latitude and a longitude in decimal degrees (DD) */
export class DDPoint {
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
  constructor(latitude: number, longitude: number) {
    if (
      latitude < -180 ||
      latitude > 180 ||
      longitude < -180 ||
      longitude > 180
    )
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
  toDMSPoint(): DMSPoint {
    const dmsLatitude = this.toDMSCoordinate(this.latitude);
    const dmsLongitude = this.toDMSCoordinate(this.longitude);

    return new DMSPoint(dmsLatitude, dmsLongitude);
  }

  /**
   * Gets the equivalent coordinate in degrees minutes seconds (DMS) notation
   *
   * @returns {DMSCoordinate} Equivalent sphere coordinate defined in degrees
   *   minutes seconds
   */
  private toDMSCoordinate(ddCoordinate: number): DMSCoordinate {
    const absDDCoordinate = Math.abs(ddCoordinate);
    const degrees = Math.floor(absDDCoordinate);
    const minutes = Math.floor((absDDCoordinate - degrees) * 60);
    const seconds = (absDDCoordinate - degrees - minutes / 60) * 3600;

    return new DMSCoordinate(
      ddCoordinate >= 0 ? degrees : -degrees,
      minutes,
      seconds
    );
  }
}
