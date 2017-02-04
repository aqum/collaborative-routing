import { combineReducers } from 'redux';
import { commentsReducer } from './comments';
import { metaReducer } from './meta';
import { routeReducer } from './route';

export const appReducer = combineReducers({
  comments: commentsReducer,
  meta: metaReducer,
  route: routeReducer,
});
