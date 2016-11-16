import * as React from 'react';
import { Comment } from './comment/comment';

export interface IFeedbackList {
  className?: any;
  comments: any[];
}

export class FeedbackList extends React.Component<IFeedbackList, {}> {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.comments.map(
          (comment, index) => <Comment {...comment} key={index} />
        )}
      </div>
    );
  }
}
