export const types = {
  FETCH_ALL_COMMENTS: 'meta/FETCH_ALL_COMMENTS',
  FINISH_FETCH_ALL_COMMENTS: 'meta/FINISH_FETCH_ALL_COMMENTS',
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
