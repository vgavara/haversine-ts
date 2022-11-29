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
};
