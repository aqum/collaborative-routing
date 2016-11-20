import * as _ from 'lodash';
import { IComment } from '../interfaces/comment';

export function commentsReducer(
  state: IComment[] = [],
  action
): IComment[] {
  switch (action.type) {
    case 'SAVE_COMMENT':
      const index = _.findIndex(state, _.pick(action.payload, ['date', 'author']));
      if (index !== -1) {
        state[index] = _.clone(action.payload);
      }
      return [...state];

    case 'ADD_COMMENT':
      const withoutPending = state.filter(comment => !comment.isBeingEdited);
      return [action.payload, ...withoutPending];

    default:
      return state;
  }
}
