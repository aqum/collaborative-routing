import { combineReducers } from 'redux';
import { commentsReducer } from './comments';
import { metaReducer } from './meta';
import { routeReducer } from './route';
import { suggestionsReducer } from './suggestions';
import { currentUserReducer } from './current-user';

export const appReducer = combineReducers({
  comments: commentsReducer,
  meta: metaReducer,
  route: routeReducer,
  suggestions: suggestionsReducer,
  currentUser: currentUserReducer,
});
