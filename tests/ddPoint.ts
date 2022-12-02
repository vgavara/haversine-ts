import { expect } from "chai";
import { DDPoint } from "@src/ddPoint";
import {
  decimalLatitude,
  decimalLongitude,
  dmsLatitude,
  dmsLongitude,
  minLatitude,
  maxLatitude,
  minLongitude,
  maxLongitude,
  offset
} from "./mocks";
import { round } from "./helpers";

const tryCreateDDPoint = (latitude: number, longitude: number): boolean => {
  try {
    new DDPoint(latitude, longitude);
    return true;
  } catch {
    return false;
  }
};

export default () => {
  it("should create a decimal degrees point", () => {
    expect(tryCreateDDPoint(minLatitude, minLongitude)).to.be.true;
    expect(tryCreateDDPoint(maxLatitude, maxLongitude)).to.be.true;
  });

  it("should return a degrees minutes seconds point equivalent", () => {
    const ddPoint = new DDPoint(decimalLatitude, decimalLongitude);

    const dmsPoint = ddPoint.toDMSPoint();

    expect(dmsPoint.latitude.degrees).to.be.equal(dmsLatitude.degrees);
    expect(dmsPoint.latitude.minutes).to.be.equal(dmsLatitude.minutes);
    expect(round(dmsPoint.latitude.seconds, 2)).to.be.equal(
      dmsLatitude.seconds
    );

    expect(dmsPoint.longitude.degrees).to.be.equal(dmsLongitude.degrees);
    expect(dmsPoint.longitude.minutes).to.be.equal(dmsLongitude.minutes);
    expect(round(dmsPoint.longitude.seconds, 2)).to.be.equal(
      dmsLongitude.seconds
    );
  });

  it("should throw an error if the latitude is out of bounds", () => {
    expect(tryCreateDDPoint(minLatitude - offset, 0)).to.be.false;
    expect(tryCreateDDPoint(maxLatitude + offset, 0)).to.be.false;
  });

  it("should throw an error if the longitude is out of bounds", () => {
    expect(tryCreateDDPoint(0, minLongitude - offset)).to.be.false;
    expect(tryCreateDDPoint(0, maxLongitude + offset)).to.be.false;
  });
};
