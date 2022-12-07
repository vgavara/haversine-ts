const radiansCoefficient = Math.PI / 180;

/**
 * Converts a degrees value into a radians equivalent.
 *
 * @param {number} degreesValue - Degrees value.
 * @returns {number} Radians equivalent of degreesValue.
 */
export const toRadians = (degreesValue: number): number =>
  degreesValue * radiansCoefficient;

/**
 * Converts a radians value into a degrees equivalent.
 *
 * @param {number} radiansValue - Radians value.
 * @returns {number} Degrees equivalent of radiansValue.
 */
export const toDegrees = (radiansValue: number): number =>
  radiansValue / radiansCoefficient;
