import { types } from '../actions/route';
import { initialRouteStore, IRouteStore } from './stores/route';

export function routeReducer(
  state = initialRouteStore,
  action,
): IRouteStore {
  switch (action.type) {
    case types.SET_START:
      return Object.assign({}, state, {
        waypoints: [ action.payload ],
      });

    case types.SET_FINISH:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints, action.payload],
      });

    case types.SET_WAYPOINTS:
      return Object.assign({}, state, {
        waypoints: action.payload,
      });

    case types.APPLY_WAYPOINTS:
      return Object.assign({}, state, {
        waypoints: action.payload,
      });

    case types.FINISH_FETCH_ROUTE:
      return Object.assign({}, state, {
        title: action.payload.title,
        accessToken: action.payload.accessToken,
        waypoints: action.payload.waypoints,
      });

    case types.INIT_ROUTE:
      return Object.assign({}, state, {
        routeId: action.payload.routeId,
      });

    case types.FINISH_CREATE_TOKEN:
      return Object.assign({}, state, {
        shareToken: action.payload.accessToken,
      });

    case types.SET_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });

    case types.SET_DETAILS:
      return Object.assign({}, state, {
        duration: action.payload.duration,
        distance: action.payload.distance,
      });

    case types.SET_TITLE: // fallthrough
    case types.RECEIVE_TITLE:
      return Object.assign({}, state, {
        title: action.payload,
      });

    default:
      return state;
  }
}
