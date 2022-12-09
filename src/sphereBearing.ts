/**
 * Sphere bearing as a tuple of start and end bearings of a sphere path
 * (orthodrome) between two points.
 */
export class SphereBearing {
  readonly start: number;
  readonly end: number;

  /**
   * Initializes a sphere bearing object instance.
   *
   * @param {number} start - Start bearing, from 0 to <360 clockwise from North.
   * @param {number} end - End bearing, from 0 to <360 clockwise from North.
   */
  constructor(start: number, end: number) {
    if (start < 0 || start >= 360)
      throw new Error(
        "Start bearing out of range: It must be between 0 and <360"
      );
    if (end < 0 || end >= 360)
      throw new Error(
        "End bearing out of range: It must be between 0 and <360"
      );

    this.start = start;
    this.end = end;
  }
}
