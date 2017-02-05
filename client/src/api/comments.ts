import {
  receiveComment,
  types as commentTypes,
  receiveAllComments,
  saveCommentError,
  saveCommentSuccess,
} from '../actions/comments';
import { types as metaTypes, finishFetchAllComments } from '../actions/meta';

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
      case commentTypes.SAVE:
        channel
          .push('method:comment.add', result.payload)
          .receive('ok', () => store.dispatch(saveCommentSuccess(result.payload)))
          .receive('error', () => store.dispatch(saveCommentError(result.payload)))
          .receive('timeout', () => store.dispatch(saveCommentError(result.payload)));
        break;

      case metaTypes.FETCH_ALL_COMMENTS:
        channel
          .push('method:feedback.list')
          .receive('ok', ({ comments }) => {
            store.dispatch(receiveAllComments(comments));
            store.dispatch(finishFetchAllComments());
          })
          .receive('error', () => store.dispatch(finishFetchAllComments(true)))
          .receive('timeout', () => store.dispatch(finishFetchAllComments(true)));

      default:
    }

    return result;
  };
}
