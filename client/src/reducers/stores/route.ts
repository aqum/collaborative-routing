import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  routeId?: number;
  title?: string;
  waypoints: LatLngLiteral[];
  suggestions: LatLngLiteral[][];
}

export const initialRouteStore = Object.seal({
  routeId: null,
  title: null,
  waypoints: [],
  suggestions: [],
});
