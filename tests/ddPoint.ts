import { expect } from "chai";
import { DDPoint } from "@src/ddPoint";
import {
  decimalLatitude,
  decimalLongitude,
  dmsLatitude,
  dmsLongitude
} from "./mocks";
import { round } from "./helpers";

export default () => {
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
    const trySetLatitude = (latitude: number): boolean => {
      try {
        new DDPoint(latitude, 0);
        return true;
      } catch {
        return false;
      }
    };

    expect(trySetLatitude(-90.1)).to.be.false;
    expect(trySetLatitude(90.1)).to.be.false;
  });

  it("should throw an error if the longitude is out of bounds", () => {
    const trySetLongitude = (longitude: number): boolean => {
      try {
        new DDPoint(0, longitude);
        return true;
      } catch {
        return false;
      }
    };

    expect(trySetLongitude(-180.1)).to.be.false;
    expect(trySetLongitude(180.1)).to.be.false;
  });
};
