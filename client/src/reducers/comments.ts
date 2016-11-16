import { IComment } from '../interfaces/comment';
import * as moment from 'moment';

const exampleComment: IComment = {
  date: moment(),
  content: 'Example comment',
  author: {
    name: 'Maria',
    avatarUrl: '',
  },
};

export function commentsReducer(
  state: IComment[] = [exampleComment],
  action
): IComment[] {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [action.payload, ...state];
    default:
      return state;
  }
}
