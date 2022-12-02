import ddPointTestSuite from "./ddPoint";
import dmsPointTestSuite from "./dmsPoint";
import sphereBearingTestSuite from "./sphereBearing";
import haversineTestSuite from "./haversine";

describe("haversine-ts test suite", () => {
  describe("DD point class test suite", ddPointTestSuite);
  describe("DMS point class test suite", dmsPointTestSuite);
  describe("Sphere bearing class test suite", sphereBearingTestSuite);
  describe("Haversine class test suite", haversineTestSuite);
});
