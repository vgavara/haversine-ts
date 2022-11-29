# haversine-ts

Typescript minimalistic library with utilities for distance calculation on a sphere surface, as the distance between two geographical coordinates given their latitude and longitude.

Main package features:
  * Allows calculating distances between to points in metres, kilometres or miles.
  * Allows using decimal degree (DD) or degrees minutes seconds (DMS) coordinates.
  * Allows specifying custom sphere radius.
  * Based on Typescript classes.

# At a glance

## Calculate the distance, in kilometres, between two decimal degrees coordinates

```typescript
import { DDPoint, Haversine } from "haversine-ts";

// New York decimal degrees (DD) coordinates are:
// latitude 40.730610 N,
// longitude 73.935242 W
const newYork = new DDPoint(40.730610, -73.935242);

// Madrid decimal degrees (DD) coordinates are:
// latitude 40.416775 N,
// longitude 3.703790 W
const madrid = new DDPoint(40.416775, -3.703790);

const haversine = new Haversine();
const distance = haversine.getDistance(newYork, madrid);

console.log(
  `The distance from New York to Madrid is ${distance} kilometres.`
);
```

## Calculate the distance, in miles, between two decimal degrees coordinates

```typescript
import { DDPoint, Haversine, UnitOfDistance } from "haversine-ts";

const newYork = new DDPoint(40.730610, -73.935242);
const madrid = new DDPoint(40.416775, -3.703790);

const haversine = new Haversine(UnitOfDistance.Mile);
const distance = haversine.getDistance(newYork, madrid);

console.log(`The distance from New York to Madrid is ${distance} miles.`);
```

## Calculate the distance, in kilometers, between two degrees minutes seconds (DMS) coordinates

```typescript
import { DMSCoordinate, DMSPoint, Haversine } from "haversine-ts";

// New York DMS coordinates are
// latitude 40° 43' 50.1960'' N,
// longitude 73° 56' 6.8712'' W
const newYork = new DMSPoint(
  new DMSCoordinate(40, 43, 50.196),
  new DMSCoordinate(73, 56, 6.8712)
);

// Madrid DMS coordinates are
// latitude 40° 25' 0.3900'' N,
// longitude 3° 42' 13.6440'' W
const madrid = new DMSPoint(
  new DMSCoordinate(40, 25, 0.39),
  new DMSCoordinate(3, 42, 13.644)
);

const haversine = new Haversine();
const distance = haversine.getDistance(newYork.toDDPoint(), madrid.toDDPoint());

console.log(
  `The distance from New York to Madrid is ${distance} kilometres.`
);
```
## Calculate the distance, in metres, between two coordinates specifying a custom sphere radius

```typescript
import { DDPoint, Haversine, UnitOfDistance } from "haversine-ts";

const newYork = new DDPoint(40.730610, -73.935242);
const madrid = new DDPoint(40.416775, -3.703790);

// Use the Earth volumetric mean radius (6371 km)
// instead of the default Earth equatorial radius (6378.137 km).
// Radius must be in the same magnitude
// than the haversine specified unit of distance
// (metres in this example)
const earthVolumetricMeanRadius = 6371 * 1000;

const haversine = new Haversine(
  UnitOfDistance.Metre,
  earthVolumetricMeanRadius
);
const distance = haversine.getDistance(newYork, madrid);

console.log(
  `The distance from New York to Madrid is ${distance} metres using Earth volumetric mean radius.`
);
```