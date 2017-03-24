import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  routeId?: number;
  waypoints: LatLngLiteral[];
  suggestions: LatLngLiteral[][];
}

export const initialRouteStore = Object.seal({
  routeId: null,
  waypoints: [],
  suggestions: [],
});
