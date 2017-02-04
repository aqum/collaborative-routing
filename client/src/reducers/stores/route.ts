import { LatLngLiteral } from 'leaflet';
import { config } from '../../../config/config';

const Leaflet = require<any>('leaflet');
// routing-machine doesn't expose Routing object
require('leaflet-routing-machine');

export interface IRouteStore {
  waypoints: LatLngLiteral[];
  control: any;
}

export const initialRouteStore = Object.seal({
  waypoints: [],
  control: Leaflet.Routing.control({
    routeWhileDragging: true,
    show: false,
    router: Leaflet.Routing.mapbox(
      config.mapboxToken,
      { profile: 'mapbox/cycling' }
    ),
  }),
});
