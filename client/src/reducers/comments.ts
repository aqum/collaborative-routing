import { IComment } from '../interfaces/comment';
import * as moment from 'moment';

export function commentsReducer(
  state: IComment[] = [],
  action
): IComment[] {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [action.payload, ...state];
    default:
      return state;
  }
}
