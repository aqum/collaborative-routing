import { types as routeTypes, applyWaypoints } from '../actions/route';

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
          .push('method:route.edit', result.payload);
          // .receive('error', () => store.dispatch(receiveCommentError(result.payload)))
          // .receive('timeout', () => store.dispatch(receiveCommentError(result.payload)));
        break;
      default:
    }

    return result;
  };
}
