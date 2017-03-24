import { types, finishFetchRoutesList, finishCreateRoute } from '../actions/current-user';
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
        channel
          .push('method:route.create', { title: '' })
          .receive('ok', (route) => store.dispatch(finishCreateRoute(route)))
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't create route`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));
        break;

      default:
    }

    return result;
  };
}
