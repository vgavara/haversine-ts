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
};
