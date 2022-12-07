import { UnitOfDistance } from "@src/haversine";
import { DDPoint } from "@src/ddPoint";
import { SphereBearing } from "@src/sphereBearing";

export const minDegrees = -180;
export const maxDegrees = 180;
export const minMinutes = 0;
export const maxMinutes = 59;
export const minSeconds = 0;
export const maxSeconds = 59.9999999999;

export const minLatitude = -90;
export const maxLatitude = 90;
export const minLongitude = minDegrees;
export const maxLongitude = maxDegrees;

export const minBearing = 0;
export const maxBearing = 359.9999999999;

export const offset = 0.0000000001;

export const decimalLatitude = 55.7488;
export const decimalLongitude = -12.5191;

export const dmsLatitude = {
  degrees: 55,
  minutes: 44,
  seconds: 55.68
};

export const dmsLongitude = {
  degrees: -12,
  minutes: 31,
  seconds: 8.76
};

export const pointA = new DDPoint(decimalLatitude, decimalLongitude);
export const pointB = new DDPoint(decimalLongitude, decimalLatitude);

export const startBearingAB = 114.89155195269666;
export const endBearingAB = 148.4680591475153;

export const bearingAB = new SphereBearing(startBearingAB, endBearingAB);

export const earthERPointABDistances = {
  [UnitOfDistance.Metre]: 9863963.349498631,
  [UnitOfDistance.Kilometre]: 9863.96334949863,
  [UnitOfDistance.Mile]: 6129.183297734562
};

export const earthVolumetricMeanRadius = 6371;

export const earthVMRPointABDistances = {
  [UnitOfDistance.Kilometre]: 9852.925783760333
};
