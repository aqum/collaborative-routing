import * as moment from 'moment';
import { pick } from 'lodash';
import { IComment } from '../interfaces/comment';
import { ICommentResponse } from '../interfaces/comment-response';

export const types = {
  ADD: 'comment/ADD',
  SAVE: 'comment/SAVE',
  REMOVE: 'comment/REMOVE',
  RECEIVE: 'comment/RECEIVE',
  RECEIVE_ERROR: 'comment/RECEIVE_ERROR',
  RECEIVE_ALL: 'comment/RECEIVE_ALL',
};

export function addComment(
  { lat, lng }: { lat: number, lng: number }
) {
  return {
    type: types.ADD,
    payload: {
      author: {
        avatarUrl: '',
        name: 'Maria',
      },
      date: moment(),
      content: '',
      lat,
      lng,
      isEdited: true,
    },
  };
}

export function saveComment(comment: IComment) {
  return {
    type: types.SAVE,
    payload: Object.assign({}, comment, {
      isEdited: false,
      isSaving: true,
    }),
  };
}

export function removeComment(comment: IComment) {
  return {
    type: types.REMOVE,
    payload: comment,
  };
}

export function receiveComment(comment: ICommentResponse) {
  return {
    type: types.RECEIVE,
    payload: standarizeComment(comment),
  };
}

export function receiveAllComments(comments: ICommentResponse[]) {
  const normalizedComments = comments.map(standarizeComment);

  return {
    type: types.RECEIVE_ALL,
    payload: normalizedComments,
  };
}

export function receiveCommentError(comment: IComment) {
  alert(`Couldn't save comment "${comment.content}".`);

  return {
    type: types.RECEIVE_ERROR,
    payload: comment,
  };
}

function standarizeComment(comment: ICommentResponse) {
  return Object.assign(
    pick(comment, ['id', 'lat', 'lng', 'content']),
    {
      date: moment(comment.inserted_at),
    }
  );
}
