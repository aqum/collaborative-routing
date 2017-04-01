import { initialMetaStore, IMetaStore } from './stores/meta';
import { types } from '../actions/meta';

export function metaReducer(
  state = initialMetaStore,
  action,
): IMetaStore {
  switch (action.type) {
    case types.FETCH_START:
      return Object.assign({}, state, { isFetching: true });

    case types.FETCH_FINISH:
      return Object.assign({}, state, { isFetching: false });

    case types.SET_MAP_CLICK_ACTION:
      return Object.assign({}, state, { mapClickAction: action.payload });

    case types.SET_MAP_MODE:
      return Object.assign({}, state, { mapMode: action.payload });

    case types.SET_ROUTE_CHANNEL:
      if (state.routeChannel) {
        state.routeChannel.leave();
      }
      return Object.assign({}, state, { routeChannel: action.payload });

    case types.AUTHORIZATION_FAILED:
      state.authService.login();
      return state;

    default:
      return state;
  }
}
