import {
  registerEvents as registerCommentsEvents,
  createMiddleware as createCommentsMiddleware,
} from './comments';
import {
  registerEvents as registerRouteEvents,
  createMiddleware as createRouteMiddleware,
} from './route';
import {
  registerEvents as registerSuggestionsEvents,
  createMiddleware as createSuggestionsMiddleware,
} from './suggestions';
const { Socket } = require<any>('phoenix');

export function init(createStore: Function, token: string) {
  return new Promise((resolve, reject) => createConnection(resolve, reject, token))
    .then(channel => {
      const store = createStore([
        createCommentsMiddleware(channel),
        createRouteMiddleware(channel),
        createSuggestionsMiddleware(channel),
      ]);
      registerCommentsEvents(channel, store);
      registerRouteEvents(channel, store);
      registerSuggestionsEvents(channel, store);
      return store;
    });
}

function createConnection(resolve, reject, token) {
  const socket = new Socket(
    'ws://localhost:4000/socket',
    {
      params: {
        token,
      },
    }
  );
  socket.onError(reject);
  socket.connect();

  const channel = socket.channel('rooms:lobby');
  channel.join()
    .receive('ok', response => resolve(channel))
    .receive('error', error => reject(error))
    .receive('timeout', error => reject(error));
}
