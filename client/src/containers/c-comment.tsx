import { connect } from 'react-redux';
import { saveComment } from '../actions/comments';
import { IComment } from '../interfaces/comment';
import { Comment } from '../components/feedback-list/comment/comment';

export const CComment = connect(
  null,
  mapDispatchToProps,
)(Comment);

function mapDispatchToProps(dispatch) {
  return {
    onSave: (comment: IComment) => dispatch(saveComment(comment)),
  };
}
