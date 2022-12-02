import { expect } from "chai";
import { SphereBearing } from "@src/sphereBearing";
import { minBearing, maxBearing, offset } from "./mocks";

const tryCreateSphereBearing = (start: number, end: number): boolean => {
  try {
    new SphereBearing(start, end);
    return true;
  } catch {
    return false;
  }
};

export default () => {
  it("should create a sphere bearing", () => {
    expect(tryCreateSphereBearing(minBearing, minBearing)).to.be.true;
    expect(tryCreateSphereBearing(maxBearing, maxBearing)).to.be.true;
  });

  it("should throw an error if the start bearing is out of bounds", () => {
    expect(tryCreateSphereBearing(minBearing - offset, minBearing)).to.be.false;
    expect(tryCreateSphereBearing(maxBearing + offset, minBearing)).to.be.false;
  });

  it("should throw an error if the end bearing is out of bounds", () => {
    expect(tryCreateSphereBearing(minBearing, minBearing - offset)).to.be.false;
    expect(tryCreateSphereBearing(minBearing, maxBearing + offset)).to.be.false;
  });
};
