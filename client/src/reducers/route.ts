import { types } from '../actions/route';
import { initialRouteStore, IRouteStore } from './stores/route';
import { config } from '../../config/config';

const Leaflet = require<any>('leaflet');
// routing-machine doesn't expose Routing object
require('leaflet-routing-machine');

export function routeReducer(
  state = initialRouteStore,
  action
): IRouteStore {
  switch (action.type) {
    case types.SET_START:
      return Object.assign({}, state, {
        start: action.payload,
      });

    case types.SET_FINISH:
      return Object.assign({}, state, {
        end: action.payload,
      });

    case types.CREATE_ROUTE:
      const control = Leaflet.Routing.control({
        waypoints: [
          L.latLng(state.start.lat, state.start.lng),
          L.latLng(state.end.lat, state.end.lng),
        ],
        routeWhileDragging: true,
        router: Leaflet.Routing.mapbox(
          config.mapboxToken,
          { profile: 'mapbox/cycling' }
        ),
      });

      return Object.assign({}, state, {
        control,
      });

    default:
      return state;
  }
}
