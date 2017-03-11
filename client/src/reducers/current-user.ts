import { initialCurrentUserStore, ICurrentUserStore } from './stores/current-user';

export function currentUserReducer(
  state = initialCurrentUserStore,
  action
): ICurrentUserStore {
  switch (action.type) {
    default:
      return state;
  }
}
