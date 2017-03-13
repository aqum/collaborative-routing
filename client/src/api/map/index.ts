import { connectChannel } from '../utils';
import { commentsMethods, commentsEvents } from './comments';
import { routeMethods, routeEvents } from './route';
import { suggestionsMethods, suggestionsEvents } from './suggestions';
import { setRouteChannel } from '../../actions/meta';
import { throttle } from 'lodash';

const mapEvents = [...commentsEvents, ...routeEvents, ...suggestionsEvents];
const mapMethods = [...commentsMethods, ...routeMethods, ...suggestionsMethods];

// Multiple actions can be fired on init before channel is opened
// when channel is opened more than one time server disconnects previous connections
const throttledCreateMapChannel = throttle(createMapChannel, 10);

export function createMapChannel(store, routeId, events): Promise<any> {
  const state = store.getState();
  const channel = state.meta.routeChannel;
  const topic = `map:${routeId}`;

  if (channel && channel.topic === topic) {
    return Promise.resolve(channel);
  }

  return connectChannel(state.meta.socket, topic, events, store.dispatch.bind(store))
    .catch(err => {
      console.log(err);
      alert(`Couldn't join channel`);
    })
    .then(newChannel => {
      store.dispatch(setRouteChannel(newChannel));
      return newChannel;
    });
}

export function mapMiddleware(store) {
  return next => action => {
    const result = next(action);

    const method = mapMethods.find(m => m.type === action.type);
    if (method) {
      throttledCreateMapChannel(store, 1, mapEvents)
        .then(channel => {
          method.callback(channel, store.dispatch.bind(store), action);
        })
        .catch(console.log.bind(console));
    }

    return result;
  };
}
