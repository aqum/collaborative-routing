import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  start?: LatLngLiteral;
  end?: LatLngLiteral;
}

export const initialRouteStore = Object.seal({
  start: null,
  end: null,
});
