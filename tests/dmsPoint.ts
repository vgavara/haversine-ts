import { expect } from "chai";
import { DMSCoordinate, DMSPoint } from "@src/dmsPoint";
import {
  decimalLatitude,
  decimalLongitude,
  dmsLatitude,
  dmsLongitude,
  minLatitude,
  maxLatitude,
  minDegrees,
  maxDegrees,
  minMinutes,
  maxMinutes,
  minSeconds,
  maxSeconds,
  offset
} from "./mocks";
import { round } from "./helpers";

const tryCreateDMSCoordinate = (
  degrees: number,
  minutes: number,
  seconds: number
): boolean => {
  try {
    new DMSCoordinate(degrees, minutes, seconds);
    return true;
  } catch {
    return false;
  }
};

const tryCreateDMSPoint = (
  latitude: DMSCoordinate,
  longitude: DMSCoordinate
): boolean => {
  try {
    new DMSPoint(latitude, longitude);
    return true;
  } catch {
    return false;
  }
};

export default () => {
  it("should create a valid DMS coordinate", () => {
    expect(tryCreateDMSCoordinate(minDegrees, minMinutes, minSeconds)).to.be
      .true;
    expect(tryCreateDMSCoordinate(maxDegrees, maxMinutes, maxSeconds)).to.be
      .true;
  });

  it("should throw an error if the degrees on a DMS coordinate are out of bounds", () => {
    expect(tryCreateDMSCoordinate(minDegrees - offset, minMinutes, minSeconds))
      .to.be.false;
    expect(tryCreateDMSCoordinate(maxDegrees + offset, minMinutes, minSeconds))
      .to.be.false;
  });

  it("should throw an error if the minutes on a DMS coordinate are out of bounds", () => {
    expect(tryCreateDMSCoordinate(minDegrees, minMinutes - offset, minSeconds))
      .to.be.false;
    expect(tryCreateDMSCoordinate(minDegrees, maxMinutes + offset, minSeconds))
      .to.be.false;
  });

  it("should throw an error if the seconds on a DMS coordinate are out of bounds", () => {
    expect(tryCreateDMSCoordinate(minDegrees, minMinutes, minSeconds - offset))
      .to.be.false;
    expect(tryCreateDMSCoordinate(minDegrees, minMinutes, maxSeconds + offset))
      .to.be.false;
  });

  it("should create a degrees minutes seconds point", () => {
    expect(
      tryCreateDMSPoint(
        new DMSCoordinate(minLatitude, minMinutes, minSeconds),
        new DMSCoordinate(minDegrees, minMinutes, minSeconds)
      )
    ).to.be.true;

    expect(
      tryCreateDMSPoint(
        new DMSCoordinate(maxLatitude, maxMinutes, maxSeconds),
        new DMSCoordinate(maxDegrees, maxMinutes, maxSeconds)
      )
    ).to.be.true;
  });

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
    expect(
      tryCreateDMSPoint(
        new DMSCoordinate(minLatitude - offset, minMinutes, minSeconds),
        new DMSCoordinate(minDegrees, minMinutes, minSeconds)
      )
    ).to.be.false;
    expect(
      tryCreateDMSPoint(
        new DMSCoordinate(maxLatitude + offset, maxMinutes, maxSeconds),
        new DMSCoordinate(maxDegrees, maxMinutes, maxSeconds)
      )
    ).to.be.false;
  });
};
