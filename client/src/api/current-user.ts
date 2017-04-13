import { types, finishFetchRoutesList, finishCreateRoute, finishFetchProfile } from '../actions/current-user';
import { fetchFinish } from '../actions/meta';

export function currentUserMiddleware(store) {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case types.FETCH_ROUTES_LIST:
        store.getState().meta.mainChannel
          .push('method:route.list')
          .receive('ok', ({ routes }) => store.dispatch(finishFetchRoutesList(routes)))
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't fetch routes`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));
        break;

      case types.CREATE_ROUTE:
        store.getState().meta.mainChannel
          .push('method:route.create', { title: '' })
          .receive('ok', (route) => store.dispatch(finishCreateRoute(route)))
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't create route`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));
        break;

      case types.FETCH_PROFILE:
        store.getState().meta.mainChannel
          .push('method:profile.get')
          .receive('ok', (profile) => store.dispatch(finishFetchProfile(profile)))
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't fetch profile`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));
        break;

      default:
    }

    return result;
  };
}
