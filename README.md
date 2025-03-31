# haversine-ts

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/VGavara/haversine-ts?include_prereleases)
![License:](https://img.shields.io/github/license/vgavara/haversine-ts)

## About

Typescript library for distance calculation on a sphere surface with both decimal degrees (DD) or degrees minutes seconds (DMS) coordinates.

Main package features:

- Allows calculating distances between to points in metres, kilometres or miles.
- Allows using decimal degree (DD) or degrees minutes seconds (DMS) coordinates.
- Allows calculating start and end bearings of a path between two points.
- Allows calculating the end point of a path given its start point, start bearing and distance.
- Allows sorting points by distance from a reference point.

## At a glance

### Calculate the distance, in kilometres, between two decimal degrees coordinates

```typescript
import { DDPoint, Haversine } from "haversine-ts";

// New York decimal degrees (DD) coordinates are:
// latitude 40.730610 N,
// longitude 73.935242 W
const newYork = new DDPoint(40.73061, -73.935242);

// Madrid decimal degrees (DD) coordinates are:
// latitude 40.416775 N,
// longitude 3.703790 W
const madrid = new DDPoint(40.416775, -3.70379);

const haversine = new Haversine();
const distance = haversine.getDistance(newYork, madrid);

console.log(`The distance from New York to Madrid is ${distance} kilometres.`);
```

### Calculate the distance, in miles, between two degrees minutes seconds (DMS) coordinates

```typescript
import {
  DMSCoordinate,
  DMSPoint,
  Haversine,
  UnitOfDistance
} from "haversine-ts";

// New York DMS coordinates are
// latitude 40° 43' 50.1960'' N,
// longitude 73° 56' 6.8712'' W
const newYork = new DMSPoint(
  new DMSCoordinate(40, 43, 50.196),
  new DMSCoordinate(-73, 56, 6.8712)
);

// Madrid DMS coordinates are
// latitude 40° 25' 0.3900'' N,
// longitude 3° 42' 13.6440'' W
const madrid = new DMSPoint(
  new DMSCoordinate(40, 25, 0.39),
  new DMSCoordinate(-3, 42, 13.644)
);

const haversine = new Haversine(UnitOfDistance.Mile);
const distance = haversine.getDistance(newYork.toDDPoint(), madrid.toDDPoint());

console.log(`The distance from New York to Madrid is ${distance} miles.`);
```

### Calculate the bearing between two points

```typescript
import { DDPoint, Haversine } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const madrid = new DDPoint(40.416775, -3.70379);

const haversine = new Haversine();
const bearing = haversine.getBearing(newYork, madrid);

console.log(
  `The start bearing of the path from New York to Madrid is ${bearing.start} degrees, and the end bearing is ${bearing.end} degrees.`
);
```

### Calculate the endpoint of a path

```typescript
import { DDPoint, Haversine } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const bearing = 65.71472;
const distance = 5762;

const haversine = new Haversine();
const madrid = haversine.getPoint(newYork, bearing, distance);

console.log(
  `Madrid is the endpoint of the path starting in New York with a bearing of ${bearing} degrees at a distance of ${distance} kilometers`
);
```

### Sort points by distance from a reference point

```typescript
import { DDPoint, Haversine, Sorting } from "haversine-ts";

const madrid = new DDPoint(40.416775, -3.70379);
const cities = [
  new DDPoint(52.5200, 13.4050),     // Berlin
  new DDPoint(40.73061, -73.935242), // New York
  new DDPoint(48.8566, 2.3522),      // Paris
  new DDPoint(35.6762, 139.6503)     // Tokyo
];

const haversine = new Haversine();
const sortedCities = haversine.sortByDistance(madrid, cities);

console.log(
  `The cities sorted by distance from Madrid (nearest to farthest) are:`
);
sortedCities.forEach((point, index) => {
  console.log(`${index + 1}. Latitude ${point.latitude}, Longitude ${point.longitude}`);
});
```

## Installation

To install the package using `nmp` simply run this command in the root folder of your node project:

```shell
npm install haversine-ts
```

## Usage

### Overview

The [Haversine](#Haversine) class supports the implementation of the sphere path resolvers (distance and bearing between two points, end point given start point, bearing and distance).

It uses as input decimal degrees (DD) coordinates defined as [DDPoint](#DDPoint) class object instances, that can be converted into degrees minutes seconds (DMS) coordinates as instances of the [DMSPoint](#DMSPoint) class. Each [DMSPoint](#DMSPoint) object instance is composed by two [DMSCoordinate](#DMSCoordinate) class object instances.

The [SphereBearing](#SphereBearing) class represents a tuple with the start and end bearings of a sphere path (orthodrome) between two points.

<a name="DDPoint"></a>

### DDPoint class

Sphere point defined by a latitude and a longitude in decimal degrees (DD)

- Constructors:
  - [new DDPoint(latitude, longitude)](#new_DDPoint_new)
- Properties:
  - [latitude](#DDPoint+latitude)
  - [longitude](#DDPoint+longitude)
- Methods:
  - [.toDMSPoint()](#DDPoint+toDMSPoint) ⇒ [<code>DMSPoint</code>](#DMSPoint)

<a name="new_DDPoint_new"></a>

#### new DDPoint(latitude, longitude)

Creates a sphere point object instance.

```typescript
import { DDPoint } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);

console.log(
  `The coordinates of New York, in decimal notation, are latitude ${newYork.latitude}, longitude ${newYork.longitude}`
);
```

<a name="DDPoint+latitude"></a>

#### ddPoint.latitude ⇒ <code>number</code>

Returns the point latitude set in the object instance constructor.

<a name="DDPoint+longitude"></a>

#### ddPoint.longitude ⇒ <code>number</code>

Returns the point longitude set in the object instance constructor.

<a name="DDPoint+toDMSPoint"></a>

#### ddPoint.toDMSPoint() ⇒ [<code>DMSPoint</code>](#DMSPoint)

Gets the equivalent point in degrees minutes seconds (DMS) notation.

```typescript
import { DDPoint } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const newYorkDMS = newYork.toDMSPoint();

console.log(
  `The coordinates of New York, in DMS notation, are ${newYorkDMS.degrees} degrees, ${newYorkDMS.minutes} minutes, ${newYorkDMS.seconds} seconds`
);
```

- Returns:
  - [<code>DMSPoint</code>](#DMSPoint) - Equivalent sphere point defined in degrees minutes seconds (DMS) notation

<a name="DMSCoordinate"></a>

### DMSCoordinate

Latitude/Longitude coordinate defined in degrees minutes seconds (DMS).

- Constructors:
  - [new DMSCoordinate(degrees, minutes, seconds)](#new_DMSCoordinate_new)
- Properties:
  - [degrees](#DMSCoordinate+degrees)
  - [minutes](#DMSCoordinate+minutes)
  - [seconds](#DMSCoordinate+seconds)

<a name="new_DMSCoordinate_new"></a>

#### new DMSCoordinate(degrees, minutes, seconds)

Initializes a DMSCoordinate object instance.

```typescript
import { DMSCoordinate } from "haversine-ts";

const newYorkLatitude = new DMSCoordinate(40, 43, 50.196);

console.log(
  `The New York latitude, in DMS notation, is ${newYorkLatitude.degrees} degrees, ${newYorkLatitude.minutes} minutes, ${newYorkLatitude.seconds} seconds,`
);
```

- Parameters
  - degrees (`number`): Coordinate degrees, from -180 to 180.
  - minutes (`number`): Coordinate minutes, from 0 to <60.
  - seconds (`number`): Coordinate seconds, from 0 to <60.
- Throws:
  - Error if degrees, minutes or seconds are out of range.

<a name="DMSCoordinate+degrees"></a>

#### dmsCoordinate.degrees ⇒ <code>number</code>

Returns the coordinate degrees set in the constructor.

<a name="DMSCoordinate+minutes"></a>

#### dmsCoordinate.minutes ⇒ <code>number</code>

Returns the coordinate minutes set in the constructor.

<a name="DMSCoordinate+seconds"></a>

#### dmsCoordinate.seconds ⇒ <code>number</code>

Returns the coordinate seconds set in the constructor.

<a name="DMSPoint"></a>

### DMSPoint class

Sphere point defined by a latitude and a longitude in degrees minutes seconds
(DMS).

- Constructors:
  - [new DMSPoint(latitude, longitude)](#new_DMSPoint_new)
- Properties
  - [latitude](#DMSPoint+latitude)
  - [longitude](#DMSPoint+longitude)
- Methods:
  - [.toDDPoint()](#DMSPoint+toDDPoint) ⇒ [<code>DDPoint</code>](#DDPoint)

<a name="new_DMSPoint_new"></a>

#### new DMSPoint(latitude, longitude)

Creates a sphere point object instance in DMS notation.

```typescript
import { DMSPoint } from "haversine-ts";

const newYork = new DMSPoint(
  new DMSCoordinate(40, 43, 50.196),
  new DMSCoordinate(-73, 56, 6.8712)
);

const newYorkLatitude = newYork.latitude;
const newYorkLongitude = newYork.longitude;

console.log(
  `The New York coordinates, in DMS notation, are latitude ${newYorkLatitude.degrees} degrees ${newYorkLatitude.minutes} minutes, ${newYorkLatitude.seconds} seconds, longitude ${newYorkLongitude.degrees} degrees ${newYorkLongitude.minutes} minutes, ${newYorkLongitude.seconds} seconds`
);
```

- Parameters
  - latitude ([<code>DMSCoordinate</code>](#DMSCoordinate)): Latitude coordinate in degrees minutes seconds.
  - longitude ([<code>DMSCoordinate</code>](#DMSCoordinate)): Longitude coordinate in degrees minutes seconds.
- Throws:
  - Error if latitude degrees are out of range (-90 to 90).

<a name="DMSPoint+latitude"></a>

#### dmsPoint.latitude ⇒ <code>DMSCoordinate</code>

Returns the point latitude set in the constructor.

<a name="DMSPoint+longitude"></a>

#### dmsPoint.longitude ⇒ <code>DMSCoordinate</code>

Returns the point longitude set in the constructor.

<a name="DMSPoint+toDDPoint"></a>

#### dmsPoint.toDDPoint() ⇒ <code>DDPoint</code>

Gets the equivalent point in decimal degrees notation.

```typescript
import { DMSPoint } from "haversine-ts";

const newYork = new DMSPoint(
  new DMSCoordinate(40, 43, 50.196),
  new DMSCoordinate(-73, 56, 6.8712)
);
const newYorkDD = newYork.toDDPoint();

console.log(
  `The coordinates of New York, in DD notation, are latitude ${newYorkDD.latitude}, longitude ${newYorkDD.longitude}`
);
```

- Returns:
  - <code>DDPoint</code> - Equivalent sphere point defined in decimal degrees (DD) notation.

<a name="Haversine"></a>

### Haversine class

Haversine formula resolver.

- Constructors:
  - [new Haversine([uod], [sphereRadius])](#new_Haversine_new)
- Methods:
  - [.getBearing(startPoint, endPoint)](#Haversine+getBearing) ⇒ [<code>SphereBearing</code>](#SphereBearing)
  - [.getDistance(pointA, pointB)](#Haversine+getDistance) ⇒ <code>number</code>
  - [.getPoint(startPoint, bearing, distance)](#Haversine+getPoint) ⇒ [<code>DDPoint</code>](#DDPoint)
  - [.sortByDistance(referencePoint, points, [sorting])](#Haversine+sortByDistance) ⇒ <code>DDPoint[]</code>

<a name="new_Haversine_new"></a>

#### new Haversine([uod], [sphereRadius])

Initializes the Haversine resolver.

```typescript
import { Haversine, UnitOfDistance } from "haversine-ts";

const haversine = new Haversine(UnitOfDistance.Mile);
```

- Parameters:
  - uod ([<code>UnitOfDistance</code>](#UnitOfDistance), optional): Unit of distance (default: <code>UnitOfDistance.Kilometre</code>)
  - sphereRadius (<code>number</code>, optional): Custom sphere radius in uod units (default: equatorial Earth radius).

<a name="Haversine+getBearing"></a>

#### haversine.getBearing(startPoint, endPoint) ⇒ <code>SphereBearing</code>

Calculates the sphere bearing, or start and end bearings, of the path between two points in a sphere.

```typescript
import { DDPoint, Haversine } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const madrid = new DDPoint(40.416775, -3.70379);

const haversine = new Haversine();
const bearing = haversine.getBearing(newYork, madrid);

console.log(
  `The start bearing of the path from New York to Madrid is ${bearing.start} degrees, and the end bearing is ${bearing.end} degrees.`
);
```

- Parameters:
  - startPoint (<code>DDPoint</code>): Start point, in decimal degrees coordinates.
  - endPoint (<code>DDPoint</code>): End point, in decimal degrees coordinates.
- Returns:
  - [<code>SphereBearing</code>](#SphereBearing) - Bearings of the path from startPoint to endPoint, in degrees (0 to 360, clockwise from North).

<a name="Haversine+getDistance"></a>

#### haversine.getDistance(pointA, pointB) ⇒ <code>number</code>

Calculates the distance between to sphere points defined as decimal degrees (DD) coordinates.

```typescript
import { DDPoint, Haversine } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const madrid = new DDPoint(40.416775, -3.70379);

const haversine = new Haversine();

const distance = haversine.getDistance(newYork, madrid);

console.log(`The distance from New York to Madrid is ${distance} kilometres.`);
```

- Parameters:
  - pointA (<code>DDPoint</code>): Point A, in decimal degrees coordinates.
  - pointB (<code>DDPoint</code>): Point B, in decimal degrees coordinates.
- Returns:
  - <code>number</code> - Distance between the points, in the unit of distance set
    in the class constructor.

<a name="Haversine+getPoint"></a>

#### haversine.getPoint(startPoint, bearing, distance) ⇒ <code>DDPoint</code>

Calculates the coordinates of the end point of a path given its start point, start bearing and distance.

```typescript
import { DDPoint, Haversine } from "haversine-ts";

const newYork = new DDPoint(40.73061, -73.935242);
const bearing = 65.71472;
const distance = 5762;

const haversine = new Haversine();
const madrid = haversine.getPoint(newYork, bearing, distance);

console.log(
  `Madrid is the endpoint of the path starting in New York with a bearing of ${bearing} degrees at a distance of ${distance} kilometers`
);
```

- Parameters:
  - startPoint (<code>DDPoint</code>): Start point, in decimal degrees coordinates.
  - bearing (<code>number</code>): Bearing to the end point, in degrees (0 to 360, clockwise from North).
  - distance (<code>number</code>): Distance from the start point to the targetted point, using as unit of measure that set in the class constructor (metres, kilometres or miles).
- Returns:.
  - [<code>DDPoint</code>](#DDPoint) - End point, in decimal degrees coordinates.

<a name="Haversine+sortByDistance"></a>

#### haversine.sortByDistance(referencePoint, points, [sorting]) ⇒ <code>DDPoint[]</code>

Sorts an array of points by their distance to a reference point.

```typescript
import { DDPoint, Haversine, Sorting } from "haversine-ts";

const madrid = new DDPoint(40.416775, -3.70379);
const cities = [
  new DDPoint(52.5200, 13.4050),     // Berlin
  new DDPoint(40.73061, -73.935242), // New York
  new DDPoint(48.8566, 2.3522),      // Paris
  new DDPoint(35.6762, 139.6503)     // Tokyo
];

const haversine = new Haversine();
const nearestCities = haversine.sortByDistance(madrid, cities);
const farthestCities = haversine.sortByDistance(madrid, cities, Sorting.Descending);

console.log("Cities sorted by distance from Madrid (nearest to farthest):", nearestCities);
console.log("Cities sorted by distance from Madrid (farthest to nearest):", farthestCities);
```

<a name="SphereBearing"></a>

### SphereBearing

Sphere bearing as a tuple of start and end bearings of a sphere path (orthodrome) between two points.

- Constructors:
  - [new SphereBearing(start, end)](#new_SphereBearing_new)
- Properties:
  - [start](#SphereBearing+start)
  - [end](#SphereBearing+end)

<a name="new_SphereBearing_new"></a>

#### new SphereBearing(start, end)

Initializes a sphere bearing object instance.

```typescript
import { SphereBearing } from "haversine-ts";

const bearing = new SphereBearing(60.5, 181);

console.log(
  `The start bearing of the path from A to B is ${bearing.start} degrees, and the end bearing is ${bearing.end} degrees.`
);
```

- Parameters
  - start (`number`): Start bearing, from 0 to <360 clockwise from North.
  - end (`number`): End bearing, from 0 to <360 clockwise from North.
- Throws:
  - Error if start or end bearings are out of range.

<a name="SphereBearing+start"></a>

#### sphereBearing.start ⇒ <code>number</code>

Start bearing set in the constructor.

<a name="SphereBearing+end"></a>

#### sphereBearing.end ⇒ <code>number</code>

End bearing set in the constructor.

<a name="UnitOfDistance"></a>

### UnitOfDistance enum

| Enum      | Value          | Description            |
| --------- | -------------- | ---------------------- |
| Metre     | <code>0</code> | Distance in metres     |
| Kilometre | <code>1</code> | Distance in kilometres |
| Mile      | <code>2</code> | Distance in miles      |

<a name="Sorting"></a>

### Sorting enum

| Enum      | Value          | Description                                 |
| --------- | -------------- | ------------------------------------------- |
| Ascending | <code>0</code> | Sort points from nearest to farthest        |
| Descending| <code>1</code> | Sort points from farthest to nearest        |

## Support

In order to notify some problem or suggest an improvement or new feature, submit an issue in the GitHub repository [issues](https://github.com/VGavara/haversine-ts/issues) section.

## License

This package is licensed under the [MIT](https://opensource.org/licenses/MIT) terms of use.

## Contact

You can contact the package creator via [email](mailto:vgavara@gmail.com), [GitHub](https://github.com/VGavara) or [LinkedIn](https://www.linkedin.com/in/vgavara/).
