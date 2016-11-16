export function addComment(content: string) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      content,
    },
  };
}
