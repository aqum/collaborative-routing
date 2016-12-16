import { LatLngLiteral } from 'leaflet';
import * as moment from 'moment';
import { IComment } from '../interfaces/comment';

export const types = {
  ADD: 'comment/ADD',
  SAVE: 'comment/SAVE',
  REMOVE: 'comment/REMOVE',
  RECEIVE: 'comment/RECEIVE',
};

export function addComment(
  { content, coordinates }: { content: string, coordinates: LatLngLiteral }
) {
  return {
    type: types.ADD,
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
    type: types.SAVE,
    payload: Object.assign({}, comment, {
      isBeingEdited: false,
    }),
  };
}

export function removeComment(comment: IComment) {
  return {
    type: types.REMOVE,
    payload: comment,
  };
}

export function receiveComment(comment: IComment) {
  return {
    type: types.RECEIVE,
    payload: Object.assign(
      {},
      comment,
      {
        date: moment(comment.date),
      }
    ),
  };
}
