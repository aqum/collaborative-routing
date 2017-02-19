import {
  receiveComment,
  types,
  receiveAllComments,
  saveCommentError,
  saveCommentSuccess,
} from '../actions/comments';
import { fetchFinish } from '../actions/meta';

export function registerEvents(channel, store) {
  channel.on(
    'event:comment_added',
    message => store.dispatch(receiveComment(message.payload))
  );
}

export function createMiddleware(channel) {
  return store => next => action => {
    const result = next(action);

    switch (action.type) {
      case types.SAVE:
        channel
          .push('method:comment.add', result.payload)
          .receive('ok', () => store.dispatch(saveCommentSuccess(result.payload)))
          .receive('error', () => store.dispatch(saveCommentError(result.payload)))
          .receive('timeout', () => store.dispatch(saveCommentError(result.payload)));
        break;

      case types.FETCH_ALL_COMMENTS:
        channel
          .push('method:comment.list')
          .receive('ok', ({ comments }) => {
            store.dispatch(receiveAllComments(comments));
          })
          .receive('error', () => store.dispatch(fetchFinish(`Couldn't restore comments`)))
          .receive('timeout', () => store.dispatch(fetchFinish('Server timeout')));

      default:
    }

    return result;
  };
}
