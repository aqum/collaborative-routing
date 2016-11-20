import { LatLngLiteral } from 'leaflet';
import * as moment from 'moment';
import { IComment } from '../interfaces/comment';

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
      isBeingEdited: true,
    },
  };
}

export function saveComment(comment: IComment) {
  return {
    type: 'SAVE_COMMENT',
    payload: Object.assign({}, comment, {
      isBeingEdited: false,
    }),
  };
}
