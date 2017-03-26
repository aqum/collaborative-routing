import { receiveSuggestion, types } from '../../actions/suggestions';

export const suggestionsEvents = [
  {
    name: 'event:suggestion_added',
    action: receiveSuggestion,
  },
];

export const suggestionsMethods = [
  {
    type: types.SET,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:suggestion.add', action.payload);
        // TODO
        // .receive('ok', () => store.dispatch(saveCommentSuccess(result.payload)))
        // .receive('error', () => store.dispatch(saveCommentError(result.payload)))
        // .receive('timeout', () => store.dispatch(saveCommentError(result.payload)));
    },
  },
];
