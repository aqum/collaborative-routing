import * as moment from 'moment';
import { pick } from 'lodash';
import { IComment } from '../interfaces/comment';
import { ICommentResponse } from '../interfaces/comment-response';

export const types = {
  ADD: 'comment/ADD',
  SAVE: 'comment/SAVE',
  SAVE_ERROR: 'comment/SAVE_ERROR',
  SAVE_SUCCESS: 'comment/SAVE_SUCCESS',
  REMOVE: 'comment/REMOVE',
  RECEIVE: 'comment/RECEIVE',
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

export function saveCommentError(comment: IComment) {
  alert(`Couldn't save comment "${comment.content}".`);

  return {
    type: types.SAVE_ERROR,
    payload: comment,
  };
}

export function saveCommentSuccess(comment: ICommentResponse) {
  return {
    type: types.SAVE_SUCCESS,
    payload: standarizeComment(comment),
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

function standarizeComment(comment: ICommentResponse) {
  return Object.assign(
    pick(comment, ['id', 'lat', 'lng', 'content']),
    {
      date: moment(comment.inserted_at),
    }
  );
}
