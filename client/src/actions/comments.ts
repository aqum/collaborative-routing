import * as moment from 'moment';
import { IComment } from '../interfaces/comment';

export const types = {
  ADD: 'comment/ADD',
  SAVE: 'comment/SAVE',
  REMOVE: 'comment/REMOVE',
  RECEIVE: 'comment/RECEIVE',
  RECEIVE_ERROR: 'comment/RECEIVE_ERROR',
  RECEIVE_ALL: 'comment/RECEIVE_ALL',
};

export function addComment(
  { content, lat, lng }: { content: string, lat: number, lng: number }
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

export function receiveAllComments(comments: any[]) {
  const normalizedComments = comments.map(comment =>
    Object.assign(
      {},
      comment,
      {
        date: moment(comment.date),
      }
    )
  );

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
