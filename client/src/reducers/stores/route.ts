import { LatLngLiteral } from 'leaflet';

export interface IRouteStore {
  start?: LatLngLiteral;
  end?: LatLngLiteral;
  control?: any;
}

export const initialRouteStore = Object.seal({
  start: null,
  end: null,
  control: null,
});
