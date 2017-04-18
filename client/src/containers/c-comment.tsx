import { connect } from 'react-redux';
import { saveComment, removeComment, saveReply } from '../actions/comments';
import { IComment } from '../interfaces/comment';
import { Comment } from '../components/feedback-list/comment/comment';

export const CComment = connect(
  null,
  mapDispatchToProps,
)(Comment);

function mapDispatchToProps(dispatch) {
  return {
    onSave: (comment: IComment) => dispatch(saveComment(comment)),
    onRemove: (comment: IComment) => dispatch(removeComment(comment)),
    onReply: (content: string, target: IComment) => dispatch(saveReply(content, target)),
  };
}
