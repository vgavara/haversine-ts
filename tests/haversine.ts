import { expect } from "chai";
import { Haversine, UnitOfDistance } from "@src/haversine";
import {
  pointA,
  pointB,
  earthERPointABDistances,
  earthVolumetricMeanRadius,
  earthVMRPointABDistances
} from "./mocks";
import { round } from "./helpers";

const testGetDistance = (
  unitOfDistance: UnitOfDistance,
  decimalPlaces: number,
  sphereRadius?: number
) => {
  const haversine = new Haversine(unitOfDistance, sphereRadius);
  const distance = haversine.getDistance(pointA, pointB);

  expect(round(distance, decimalPlaces)).to.be.equal(
    round(earthERPointABDistances[unitOfDistance], decimalPlaces)
  );
};

export default () => {
  it("should calculate the distance, in metres, between two points in the Earth (Equatorial radius)", () => {
    testGetDistance(UnitOfDistance.Metre, 1);
  });

  it("should calculate the distance, in kilometres, between two points in the Earth (Equatorial radius)", () => {
    testGetDistance(UnitOfDistance.Kilometre, 4);
  });

  it("should calculate the distance, in miles, between two points in the Earth (Equatorial radius)", () => {
    testGetDistance(UnitOfDistance.Mile, 4);
  });

  it("should calculate the distance, in kilometers, between two points in a custom sphere (Earth volumetric mean radius)", () => {
    const haversine = new Haversine(
      UnitOfDistance.Kilometre,
      earthVolumetricMeanRadius
    );
    const distance = haversine.getDistance(pointA, pointB);

    expect(round(distance, 4)).to.be.equal(
      round(earthVMRPointABDistances[UnitOfDistance.Kilometre], 4)
    );
  });
};
