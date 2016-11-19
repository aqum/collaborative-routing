import { LatLngLiteral } from 'leaflet';
import * as moment from 'moment';

export function addComment(
  { content, coordinates }: { content: string, coordinates: LatLngLiteral }
) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      author: {
        avatarUrl: '',
        name: 'Maria',
      },
      date: moment(),
      content,
      coordinates,
    },
  };
}
