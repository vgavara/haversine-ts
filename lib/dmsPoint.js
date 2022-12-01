"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMSPoint = exports.DMSCoordinate = void 0;
const ddPoint_1 = require("./ddPoint");
/** Latitude/Longitude coordinate defined in degrees minutes seconds (DMS) */
class DMSCoordinate {
    /**
     * Initializes a DMSCoordinate object instance
     *
     * @param {number} degrees Coordinate degrees, from -180 to 180
     * @param {number} minutes Coordinate minutes, from 0 to <60
     * @param {number} seconds Coordinate seconds, from 0 to <60
     * @throws Error if degrees, minutes or seconds are out of range
     */
    constructor(degrees, minutes, seconds) {
        if (degrees < -180 ||
            degrees > 180 ||
            minutes < 0 ||
            minutes >= 60 ||
            seconds < 0 ||
            seconds >= 60)
            throw new Error("Coordinate(s) out of range: they must be in the range -180 to 180 (degrees) or 0 to 59 (minutes and seconds)");
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
    }
}
exports.DMSCoordinate = DMSCoordinate;
/**
 * Sphere point defined by a latitude and a longitude in degrees minutes seconds
 * (DMS)
 */
class DMSPoint {
    /**
     * Creates a sphere point object instance.
     *
     * @param {DMSCoordinate} latitude - Latitude coordinate in degrees minutes
     *   seconds.
     * @param {DMSCoordinate} longitude - Longitude coordinate in degrees minutes
     *   seconds.
     * @throws Error if latitude degrees are out of range (-90 to 90)
     */
    constructor(latitude, longitude) {
        if (latitude.degrees < -90 || latitude.degrees > 90)
            throw new Error("Latitude out of range: It must be between -90 and 90");
        this.latitude = latitude;
        this.longitude = longitude;
    }
    /**
     * Gets the equivalent point in decimal degrees notation
     *
     * @returns {DDPoint} Equivalent sphere point defined in decimal degrees
     */
    toDDPoint() {
        const ddLatitude = Math.abs(this.latitude.degrees) +
            this.latitude.minutes / 60 +
            this.latitude.seconds / 3600;
        const ddLongitude = Math.abs(this.longitude.degrees) +
            this.longitude.minutes / 60 +
            this.longitude.seconds / 3600;
        return new ddPoint_1.DDPoint(this.latitude.degrees >= 0 ? ddLatitude : -ddLatitude, this.longitude.degrees >= 0 ? ddLongitude : -ddLongitude);
    }
}
exports.DMSPoint = DMSPoint;
