import { receiveComment, types } from '../actions/comments';

export function registerEvents(channel, store) {
  channel.on(
    'event:comment_added',
    message => store.dispatch(receiveComment(message.payload))
  );
}

export function createMiddleware(channel) {
  return store => next => action => {
    const result = next(action);

    if (action.type !== types.SAVE) {
      return result;
    }

    channel.push(
      'method:comment.add',
      {
        payload: result.payload,
      }
    );

    return result;
  };
}
