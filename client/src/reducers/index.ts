import { combineReducers } from 'redux';
import { commentsReducer } from './comments';
import { metaReducer } from './meta';

export const appReducer = combineReducers({
  comments: commentsReducer,
  meta: metaReducer,
});
