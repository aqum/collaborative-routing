import { connect } from 'react-redux';
import { FeedbackList, IFeedbackList } from '../components/feedback-list/feedback-list';

export const CFeedbackList = connect(
  mapStateToProps,
)(FeedbackList);

function mapStateToProps(state): IFeedbackList {
  return {
    comments: state.comments,
    suggestions: state.suggestions,
  };
}
