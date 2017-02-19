import * as moment from 'moment';
import { pick } from 'lodash';
import { LatLngLiteral } from 'leaflet';
import { ISuggestionResponse } from '../interfaces/suggestion-response';

export const types = {
  SET: 'suggestion/SET',
  RECEIVE: 'suggestion/RECEIVE',
};

export function setSuggestion(waypoints: LatLngLiteral[]) {
  return {
    type: types.SET,
    payload: {
      author: {
        avatarUrl: '',
        name: 'Maria',
      },
      date: moment(),
      waypoints,
      isSaving: true,
    },
  };
}

export function receiveSuggestion(suggestion: ISuggestionResponse) {
  return {
    type: types.RECEIVE,
    payload: standarizeSuggestion(suggestion),
  };
}

function standarizeSuggestion(suggestion: ISuggestionResponse) {
  return Object.assign(
    pick(suggestion, ['id', 'waypoints']),
    {
      date: moment(suggestion.inserted_at),
    }
  );
}
