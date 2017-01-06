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

    default:
      return state;
  }
}
