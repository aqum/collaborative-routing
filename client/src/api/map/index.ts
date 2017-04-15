import { connectChannel } from '../utils';
import { commentsMethods, commentsEvents } from './comments';
import { routeMethods, routeEvents } from './route';
import { suggestionsMethods, suggestionsEvents } from './suggestions';
import { setRouteChannel, authorizationFailed } from '../../actions/meta';

const mapEvents = [...commentsEvents, ...routeEvents, ...suggestionsEvents];
const mapMethods = [...commentsMethods, ...routeMethods, ...suggestionsMethods];

// Multiple actions can be fired on init before channel is opened
// when channel is opened more than one time server disconnects previous connections
const throttledCreateMapChannel: any = createThrottledMapChannel(createMapChannel);

function createThrottledMapChannel(createFn) {
  let promiseCache = null;

  return function () {
    if (promiseCache) {
      return promiseCache;
    }

    return promiseCache = createFn.apply(null, arguments)
      .then(response => {
        promiseCache = null;
        return response;
      })
      .catch(err => {
        promiseCache = null;
        return Promise.reject(err);
      });
  };
}

export function createMapChannel(store, events): Promise<any> {
  const state = store.getState();
  const channel = state.meta.routeChannel;
  const routeId = state.route.routeId;
  const topic = `map:${routeId}`;

  if (channel && channel.topic === topic) {
    return Promise.resolve(channel);
  }

  if (channel && channel.topic !== topic) {
    channel.leave();
  }

  return connectChannel(
    state.meta.socket,
    topic,
    events,
    store.dispatch.bind(store),
    { accessToken: state.route.accessToken },
  )
    .then(newChannel => {
      store.dispatch(setRouteChannel(newChannel));
      return newChannel;
    });
}

export function mapMiddleware(store) {
  return next => action => {
    const method = mapMethods.find(m => m.type === action.type);

    if (method) {
      throttledCreateMapChannel(store, mapEvents)
        .then(channel => {
          method.callback(channel, store.dispatch.bind(store), action);
        })
        .catch(err => {
          if (err.reason === 'unauthorized') {
            store.dispatch(authorizationFailed());
            return;
          }

          return Promise.reject(err);
        });
    }

    return next(action);
  };
}
