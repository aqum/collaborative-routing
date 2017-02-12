import { initialMetaStore, IMetaStore } from './stores/meta';
import { types } from '../actions/meta';

export function metaReducer(
  state = initialMetaStore,
  action
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

    default:
      return state;
  }
}
