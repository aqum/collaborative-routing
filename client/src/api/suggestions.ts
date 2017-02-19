import { receiveSuggestion, types } from '../actions/suggestions';

export function registerEvents(channel, store) {
  channel.on(
    'event:suggestion_added',
    message => store.dispatch(receiveSuggestion(message.payload))
  );
}

export function createMiddleware(channel) {
  return store => next => action => {
    const result = next(action);

    switch (action.type) {
      case types.SET:
        channel
          .push('method:suggestion.add', result.payload);
          // .receive('ok', () => store.dispatch(saveCommentSuccess(result.payload)))
          // .receive('error', () => store.dispatch(saveCommentError(result.payload)))
          // .receive('timeout', () => store.dispatch(saveCommentError(result.payload)));
        break;
      default:
    }

    return result;
  };
}
