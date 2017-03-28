const { Socket } = require<any>('phoenix');

export interface IChannelEvent {
  name: string;
  action: Function;
}

export function createSocket(token) {
  return new Promise((resolve, reject) => {
    const socket = new Socket(
      'ws://localhost:4000/socket',
      {
        params: {
          token,
        },
      }
    );

    socket.onError(reject);
    socket.onClose(reject);
    socket.onOpen(() => resolve(socket));

    socket.connect();
  });
}

export function connectChannel(
  socket,
  name,
  events: IChannelEvent[] = [],
  dispatch?: Function,
  message?,
) {
  return new Promise((resolve, reject) => {
    const channel = socket.channel(name, message);

    if (dispatch) {
      events.forEach(event =>
        channel.on(event.name, message => dispatch(
          event.action(message.payload)
        ))
      );
    }

    channel.join()
      .receive('ok', response => resolve(channel))
      .receive('error', reject)
      .receive('timeout', reject);

    return channel;
  });
}
