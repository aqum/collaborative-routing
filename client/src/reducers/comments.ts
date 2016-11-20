import * as _ from 'lodash';
import { IComment } from '../interfaces/comment';

export function commentsReducer(
  state: IComment[] = [],
  action
): IComment[] {
  switch (action.type) {
    case 'SAVE_COMMENT':
      const editedIndex = findCommentIndex(state, action.payload);
      if (editedIndex !== -1) {
        state[editedIndex] = _.clone(action.payload);
      }
      return [...state];

    case 'ADD_COMMENT':
      const withoutPending = state.filter(comment => !comment.isBeingEdited);
      return [action.payload, ...withoutPending];

    case 'REMOVE_COMMENT':
      const removedIndex = findCommentIndex(state, action.payload);
      return _.without(state, state[removedIndex]);

    default:
      return state;
  }
}

function findCommentIndex(state, comment: IComment): number {
  return _.findIndex(state, _.pick(comment, ['date', 'author']));
}
