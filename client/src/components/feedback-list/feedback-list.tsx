import * as React from 'react';
import './feedback-list.scss';
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
          (comment, index) => <Comment {...comment}
            className='cr-feedback-list__item'
            key={index} />
        )}
      </div>
    );
  }
}
