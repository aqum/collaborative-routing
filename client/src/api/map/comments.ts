import {
  receiveComment,
  types,
  receiveAllComments,
  saveCommentError,
  saveCommentSuccess,
} from '../../actions/comments';
import { fetchFinish } from '../../actions/meta';

export const commentsEvents = [
  {
    name: 'event:comment_added',
    action: receiveComment,
  },
];

export const commentsMethods = [
  {
    type: types.SAVE,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:comment.add', action.payload)
        .receive('ok', comment => dispatch(saveCommentSuccess(comment)))
        .receive('error', () => dispatch(saveCommentError(action.payload)))
        .receive('timeout', () => dispatch(saveCommentError(action.payload)));
    },
  },
  {
    type: types.FETCH_ALL_COMMENTS,
    callback: (channel, dispatch) => {
      channel
        .push('method:comment.list')
        .receive('ok', ({ comments }) => {
          dispatch(receiveAllComments(comments));
        })
        .receive('error', () => dispatch(fetchFinish(`Couldn't restore comments`)))
        .receive('timeout', () => dispatch(fetchFinish('Server timeout')));
    },
  },
  {
    type: types.SAVE_REPLY,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:comment.add', action.payload)
        .receive('ok', comment => dispatch(receiveComment(comment)))
        .receive('error', () => dispatch(fetchFinish(`Couldn't save your reply`)))
        .receive('timeout', () => dispatch(fetchFinish(`Server timeout`)));
    },
  },
];
