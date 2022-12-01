"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRadians = void 0;
const radiansCoefficient = Math.PI / 180;
/**
 * Converts a degrees value into a radians equivalent.
 *
 * @param {number} degreesValue - Degrees value.
 * @returns {number} Radians equivalent of degreesValue.
 */
const toRadians = (degreesValue) => degreesValue * radiansCoefficient;
exports.toRadians = toRadians;
