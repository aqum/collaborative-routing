import { types } from '../actions/current-user';
import { initialCurrentUserStore, ICurrentUserStore } from './stores/current-user';

export function currentUserReducer(
  state = initialCurrentUserStore,
  action,
): ICurrentUserStore {
  switch (action.type) {
    case types.FINISH_FETCH_ROUTES_LIST:
      return Object.assign(
        {},
        state,
        { routes: action.payload },
      );

    case types.FINISH_CREATE_ROUTE:
      return Object.assign(
        {},
        state,
        { routes: [action.payload, ...state.routes] },
      );

    case types.FINISH_FETCH_PROFILE:
      return Object.assign(
        {},
        state,
        { name: action.payload.name },
      );

    case types.UPDATE_PROFILE:
      return Object.assign(
        {},
        state,
        { name: action.payload.name },
      );

    default:
      return state;
  }
}
