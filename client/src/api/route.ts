import { types as routeTypes, applyWaypoints, finishFetchRoute } from '../actions/route';
import { fetchFinish } from '../actions/meta';

export function registerEvents(channel, store) {
  channel.on(
    'event:route_changed',
    message => store.dispatch(applyWaypoints(message.payload))
  );
}

export function createMiddleware(channel) {
  return store => next => action => {
    const result = next(action);

    switch (action.type) {
      case routeTypes.SET_WAYPOINTS:
        channel
          .push('method:route.edit', result.payload)
          .receive('error', () => alert(`Couldn't save route edit`))
          .receive('timeout', () => alert('Server timeout'));
        break;

      case routeTypes.FETCH_ROUTE:
        channel
          .push('method:route.details')
          .receive('ok', details => store.dispatch(finishFetchRoute(details)))
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't restore route`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));
        break;

      default:
    }

    return result;
  };
}
