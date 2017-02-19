import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  waypoints: LatLngLiteral[];
  suggestions: LatLngLiteral[][];
}

export const initialRouteStore = Object.seal({
  waypoints: [],
  suggestions: [],
});
