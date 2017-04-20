import * as _ from 'lodash';
import { IComment } from '../interfaces/comment';
import { types } from '../actions/comments';

export function commentsReducer(
  state: IComment[] = [],
  action
): IComment[] {
  switch (action.type) {
    case types.SAVE:
      const editedIndex = findCommentIndex(state, action.payload);
      if (editedIndex !== -1) {
        state[editedIndex] = _.clone(action.payload);
      }
      return [...state];

    case types.SAVE_ERROR:
      const compareFn = createCompareFn(action.payload);
      const existingComment = state.find(compareFn);

      return _.without(state, existingComment);

    case types.SAVE_SUCCESS:
      const clonedState = [...state];
      const pendingIndex = findCommentIndex(state, action.payload);

      if (pendingIndex === -1) {
        alert(`Coulnd't find comment to set success state`);
        return state;
      }

      clonedState.splice(pendingIndex, 1, action.payload);

      return clonedState;

    case types.ADD:
      const withoutPending = state.filter(comment => !comment.isEdited);
      return [action.payload, ...withoutPending];

    case types.REMOVE:
      const removedIndex = findCommentIndex(state, action.payload);
      return _.without(state, state[removedIndex]);

    case types.RECEIVE:
      if (action.payload.reply_to_id) {
        return insertReplyComment(state, action.payload);
      }
      return [action.payload, ...state];

    case types.RECEIVE_ALL:
      return _.clone(action.payload);

    default:
      return state;
  }
}

function insertReplyComment(state: IComment[], replyComment: IComment) {
  const targetStateIndex = state.findIndex(comment => comment.id === replyComment.reply_to_id);
  const targetComment = state[targetStateIndex];
  if (!targetComment) {
    console.log(`Couldn't find target comment for updated reply`, replyComment);
    return state;
  }

  state[targetStateIndex] = Object.assign(
    {},
    targetComment,
    { replies: targetComment.replies.concat(replyComment) }
  );
  return [...state];
}

function findCommentIndex(state: IComment[], comment: IComment): number {
  const compareFn = createCompareFn(comment);
  return _.findIndex(state, compareFn);
}

function createCompareFn(compareTo: IComment) {
  return (c: IComment) => c.lng === compareTo.lng && c.lat === compareTo.lat;
}
