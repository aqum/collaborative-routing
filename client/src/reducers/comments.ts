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

    case types.ADD:
      const withoutPending = state.filter(comment => !comment.isBeingEdited);
      return [action.payload, ...withoutPending];

    case types.REMOVE:
      const removedIndex = findCommentIndex(state, action.payload);
      return _.without(state, state[removedIndex]);

    case types.RECEIVE:
      const existingIndex = findCommentIndex(state, action.payload);
      if (existingIndex !== -1) {
        state[existingIndex] = _.clone(action.payload);
        return [...state];
      }

      return [action.payload, ...state];

    default:
      return state;
  }
}

function findCommentIndex(state: IComment[], comment: IComment): number {
  return _.findIndex(
    state,
    c => _.isEqual(c.author, comment.author) && c.date.diff(comment.date) === 0
  );
}
