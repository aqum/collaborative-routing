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
      const withoutPending = state.filter(comment => !comment.isEdited);
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

    case types.RECEIVE_ALL:
      return _.clone(action.payload);

    case types.RECEIVE_ERROR:
      const compareFn = createCompareFn(action.payload);
      const existingComment = state.find(compareFn);

      return _.without(state, existingComment);

    default:
      return state;
  }
}

function findCommentIndex(state: IComment[], comment: IComment): number {
  const compareFn = createCompareFn(comment);
  return _.findIndex(state, compareFn);
}

function createCompareFn(compareTo: IComment) {
  return (c: IComment) => c.lng === compareTo.lng && c.lat === compareTo.lat;
}
