import * as moment from 'moment';
import { pick } from 'lodash';
import { IComment } from '../interfaces/comment';
import { ICommentResponse } from '../interfaces/comment-response';
import { fetchStart, fetchFinish } from './meta';

export const types = {
  ADD: 'comment/ADD',
  SAVE: 'comment/SAVE',
  SAVE_ERROR: 'comment/SAVE_ERROR',
  SAVE_SUCCESS: 'comment/SAVE_SUCCESS',
  REMOVE: 'comment/REMOVE',
  RECEIVE: 'comment/RECEIVE',
  RECEIVE_ALL: 'comment/RECEIVE_ALL',
  FETCH_ALL_COMMENTS: 'comment/FETCH_ALL_COMMENTS',
  FINISH_FETCH_ALL_COMMENTS: 'comment/FINISH_FETCH_ALL_COMMENTS',
};

export function addComment(
  { lat, lng }: { lat: number, lng: number },
  authorName,
) {
  return {
    type: types.ADD,
    payload: {
      user: {
        name: authorName,
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

  return dispatch => {
    dispatch(fetchFinish());
    dispatch({
      type: types.RECEIVE_ALL,
      payload: normalizedComments,
    });
  };
}

function standarizeComment(comment: ICommentResponse) {
  return Object.assign(
    pick(comment, ['id', 'lat', 'lng', 'content', 'user']),
    {
      date: moment(comment.inserted_at),
    }
  );
}

export function fetchAllComments() {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.FETCH_ALL_COMMENTS,
    });
  };
}
