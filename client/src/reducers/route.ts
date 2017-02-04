import { types } from '../actions/route';
import { initialRouteStore, IRouteStore } from './stores/route';

export function routeReducer(
  state = initialRouteStore,
  action
): IRouteStore {
  switch (action.type) {
    case types.SET_START:
      state.control.setWaypoints([
        L.latLng(action.payload.lat, action.payload.lng),
      ]);

      return Object.assign({}, state, {
        waypoints: [ action.payload ],
      });

    case types.SET_FINISH:
      const waypoints = [...state.waypoints, action.payload];
      state.control.setWaypoints(waypoints);

      return Object.assign({}, state, {
        waypoints,
      });

    case types.SET_WAYPOINTS:
      return Object.assign({}, state, {
        waypoints: action.payload,
      });

    default:
      return state;
  }
}
