import { types } from '../actions/route';
import { initialRouteStore, IRouteStore } from './stores/route';

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
        finish: action.payload,
      });

    default:
      return state;
  }
}
