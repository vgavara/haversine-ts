import { expect } from "chai";
import { DMSCoordinate, DMSPoint } from "@src/dmsPoint";
import {
  decimalLatitude,
  decimalLongitude,
  dmsLatitude,
  dmsLongitude
} from "./mocks";
import { round } from "./helpers";

export default () => {
  it("should return a decimal degrees point equivalent", () => {
    const latitude = new DMSCoordinate(
      dmsLatitude.degrees,
      dmsLatitude.minutes,
      dmsLatitude.seconds
    );
    const longitude = new DMSCoordinate(
      dmsLongitude.degrees,
      dmsLongitude.minutes,
      dmsLongitude.seconds
    );
    const dmsPoint = new DMSPoint(latitude, longitude);

    const ddPoint = dmsPoint.toDDPoint();

    expect(round(ddPoint.latitude, 4)).to.be.equal(decimalLatitude);
    expect(round(ddPoint.longitude, 4)).to.be.equal(decimalLongitude);
  });

  it("should throw an error if the latitude is out of bounds", () => {
    const trySetLatitudeDegrees = (latitudeDegrees: number): boolean => {
      const longitude = new DMSCoordinate(
        dmsLongitude.degrees,
        dmsLongitude.minutes,
        dmsLongitude.seconds
      );

      try {
        const latitude = new DMSCoordinate(
          latitudeDegrees,
          dmsLatitude.minutes,
          dmsLatitude.seconds
        );

        new DMSPoint(latitude, longitude);
        return true;
      } catch {
        return false;
      }
    };

    expect(trySetLatitudeDegrees(-90.1)).to.be.false;
    expect(trySetLatitudeDegrees(90.1)).to.be.false;
  });

  it("should throw an error if the longitude is out of bounds", () => {
    const trySetLongitudeDegrees = (longitudeDegrees: number): boolean => {
      try {
        new DMSCoordinate(
          longitudeDegrees,
          dmsLongitude.minutes,
          dmsLongitude.seconds
        );
        return true;
      } catch {
        return false;
      }
    };

    expect(trySetLongitudeDegrees(-180.1)).to.be.false;
    expect(trySetLongitudeDegrees(180.1)).to.be.false;
  });
};
