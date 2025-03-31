import { expect } from "chai";
import { Haversine, UnitOfDistance, Sorting } from "@src/haversine";
import { DDPoint } from "@src/ddPoint";
import {
  pointA,
  pointB,
  earthERPointABDistances,
  earthVolumetricMeanRadius,
  earthVMRPointABDistances,
  bearingAB,
  startBearingAB
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

  it("should calculate the bearing between two points", () => {
    const haversine = new Haversine();

    const bearing = haversine.getBearing(pointA, pointB);

    expect(round(bearing.start, 1)).to.be.equal(round(bearingAB.start, 1));
    expect(round(bearing.end, 1)).to.be.equal(round(bearingAB.end, 1));
  });

  it("should calculate the endpoint given a start point, a bearing and a distance", () => {
    const haversine = new Haversine(UnitOfDistance.Kilometre);

    const endPoint = haversine.getPoint(
      pointA,
      startBearingAB,
      earthERPointABDistances[UnitOfDistance.Kilometre]
    );

    expect(round(endPoint.latitude, 4)).to.be.eql(round(pointB.latitude, 4));
    expect(round(endPoint.longitude, 4)).to.be.eql(round(pointB.longitude, 4));
  });

  it("should sort points by distance from a reference point in ascending order", () => {
    const haversine = new Haversine();
    const referencePoint = new DDPoint(0, 0);
    
    const point1 = new DDPoint(1, 1);     // ~157km
    const point2 = new DDPoint(0.5, 0.5); // ~79km
    const point3 = new DDPoint(2, 2);     // ~314km
    
    const points = [point1, point3, point2];
    const sortedPoints = haversine.sortByDistance(referencePoint, points);
    
    // Points should be sorted from nearest to farthest: point2, point1, point3
    expect(sortedPoints[0]).to.equal(point2);
    expect(sortedPoints[1]).to.equal(point1);
    expect(sortedPoints[2]).to.equal(point3);
  });

  it("should sort points by distance from a reference point in descending order", () => {
    const haversine = new Haversine();
    const referencePoint = new DDPoint(0, 0);
    
    const point1 = new DDPoint(1, 1);     // ~157km
    const point2 = new DDPoint(0.5, 0.5); // ~79km
    const point3 = new DDPoint(2, 2);     // ~314km
    
    const points = [point1, point2, point3];
    const sortedPoints = haversine.sortByDistance(referencePoint, points, Sorting.Descending);
    
    // Points should be sorted from farthest to nearest: point3, point1, point2
    expect(sortedPoints[0]).to.equal(point3);
    expect(sortedPoints[1]).to.equal(point1);
    expect(sortedPoints[2]).to.equal(point2);
  });

  it("should return an empty array when sorting an empty array of points", () => {
    const haversine = new Haversine();
    const referencePoint = new DDPoint(0, 0);
    
    const sortedPoints = haversine.sortByDistance(referencePoint, []);
    
    expect(sortedPoints).to.be.an('array').that.is.empty;
  });
};
