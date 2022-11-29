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
}
