import { combineReducers } from 'redux';
import { commentsReducer } from './comments';

export const appReducer = combineReducers({
  comments: commentsReducer,
});
