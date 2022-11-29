import ddPointTestSuite from "./ddPoint";
import dmsPointTestSuite from "./dmsPoint";
import haversineTestSuite from "./haversine";

describe("haversine-ts test suite", () => {
  describe("DD point class test suite", ddPointTestSuite);
  describe("DMS point class test suite", dmsPointTestSuite);
  describe("Haversine class test suite", haversineTestSuite);
});
