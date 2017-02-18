import { ISuggestion } from '../interfaces/suggestion';
import { types } from '../actions/suggestions';

export function suggestionsReducer(state: ISuggestion[] = [], action): ISuggestion[] {
  switch (action.type) {
    case types.SET:
      return [action.payload];
    case types.RECEIVE:
      return [action.payload];
    default:
      return state;
  }
}
