import { initialMetaStore, IMetaStore } from './stores/meta';
import { types } from '../actions/meta';

export function metaReducer(
  state = initialMetaStore,
  action
): IMetaStore {
  switch (action.type) {
    case types.FETCH_ALL_COMMENTS:
      return Object.assign({}, state, { isFetching: true });

    case types.FINISH_FETCH_ALL_COMMENTS:
      return Object.assign({}, state, { isFetching: false });

    case types.SET_MAP_CLICK_ACTION:
      return Object.assign({}, state, { mapClickAction: action.payload });

    default:
      return state;
  }
}
