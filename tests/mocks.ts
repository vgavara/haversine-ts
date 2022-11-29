import { UnitOfDistance } from "@src/haversine";
import { DDPoint } from "@src/ddPoint";

export const decimalLatitude = 55.7488;
export const decimalLongitude = 12.5191;

export const pointA = new DDPoint(decimalLatitude, decimalLongitude);
export const pointB = new DDPoint(decimalLongitude, decimalLatitude);

export const earthERPointABDistances = {
  [UnitOfDistance.Metre]: 6076307.801510576,
  [UnitOfDistance.Kilometre]: 6076.307801510576,
  [UnitOfDistance.Mile]: 3775.643011772324
};

export const earthVolumetricMeanRadius = 6371;

export const earthVMRPointABDistances = {
  [UnitOfDistance.Kilometre]: 6069.508541980813
};
