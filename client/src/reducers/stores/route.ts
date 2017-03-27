import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  accessToken?: string;
  routeId?: number;
  title?: string;
  waypoints: LatLngLiteral[];
  suggestions: LatLngLiteral[][];
}

export const initialRouteStore = Object.seal({
  waypoints: [],
  suggestions: [],
});
