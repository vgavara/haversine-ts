import { UnitOfDistance } from "@src/haversine";
import { DDPoint } from "@src/ddPoint";

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

export const earthERPointABDistances = {
  [UnitOfDistance.Metre]: 9863963.349498631,
  [UnitOfDistance.Kilometre]: 9863.96334949863,
  [UnitOfDistance.Mile]: 6129.183297734562
};

export const earthVolumetricMeanRadius = 6371;

export const earthVMRPointABDistances = {
  [UnitOfDistance.Kilometre]: 9852.925783760333
};
