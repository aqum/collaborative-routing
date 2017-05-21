import * as React from 'react';
import { Map } from './map';
import { latLng } from 'leaflet';
import * as _ from 'lodash';

const L = require('leaflet');
require('leaflet-routing-machine');
const { Waypoint } = L.Routing;

describe('compareWaypoints', () => {
  let component;

  beforeEach(() => {
    component = new Map();
  });

  test('true for the same waypints', () => {
    const coords = [
      latLng([10, 20]),
      latLng([20, 20]),
    ];
    const controlMock = createControlMock(coords);

    const result = component.compareWaypoints(controlMock, coords);

    expect(result).toBe(true);
  });

  test('false for different waypoints', () => {
    const coords = [
      latLng([10, 20]),
      latLng([20, 20]),
    ];
    const differentCoords = [
      latLng([1, 2]),
      latLng([2, 2]),
    ];
    const controlMock = createControlMock(differentCoords);

    const result = component.compareWaypoints(controlMock, coords);

    expect(result).toBe(false);
  });

  function createControlMock(coords) {
    const waypoints = coords.map(
      latLng => new Waypoint(_.cloneDeep(latLng)),
    );

    return {
      _selectedRoute: {
        inputWaypoints: waypoints,
      },
    };
  }
});
