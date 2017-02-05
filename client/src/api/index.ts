import {
  registerEvents as registerCommentsEvents,
  createMiddleware as createCommentsMiddleware,
} from './comments';
import {
  registerEvents as registerRouteEvents,
  createMiddleware as createRouteMiddleware,
} from './route';
const { Socket } = require<any>('phoenix');

export function init(createStore: Function) {
  return new Promise(createConnection)
    .then(channel => {
      const store = createStore([
        createCommentsMiddleware(channel),
        createRouteMiddleware(channel),
      ]);
      registerCommentsEvents(channel, store);
      registerRouteEvents(channel, store);
      return store;
    });
}

function createConnection(resolve, reject) {
  const socket = new Socket('ws://localhost:4000/socket');
  socket.connect();

  const channel = socket.channel('rooms:lobby');
  channel.join()
    .receive('ok', response => resolve(channel))
    .receive('error', error => reject(error))
    .receive('timeout', error => reject(error));
}
