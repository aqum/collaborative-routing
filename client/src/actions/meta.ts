export const types = {
  FETCH_ALL_COMMENTS: 'meta/FETCH_ALL_COMMENTS',
  FINISH_FETCH_ALL_COMMENTS: 'meta/FINISH_FETCH_ALL_COMMENTS',
  SET_MAP_CLICK_ACTION: 'meta/SET_MAP_CLICK_ACTION',
};

export function fetchAllComments() {
  return {
    type: types.FETCH_ALL_COMMENTS,
  };
}

export function finishFetchAllComments(hasError = false) {
  if (hasError) {
    alert(`Couldn't fetch existing comments. Check your connection.`);
  }

  return {
    type: types.FINISH_FETCH_ALL_COMMENTS,
  };
}

export function setMapClickAction(action: Function) {
  return {
    type: types.SET_MAP_CLICK_ACTION,
    payload: action,
  };
}
