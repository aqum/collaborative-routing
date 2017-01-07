import * as React from 'react';
import * as classNames from 'classnames';
import './feedback-list.scss';
import { CComment } from '../../containers/c-comment';

export interface IFeedbackList {
  className?: any;
  comments: any[];
}

export class FeedbackList extends React.Component<IFeedbackList, {}> {
  render() {
    return (
      <div className={classNames(this.props.className, 'cr-feedback-list')}>
        {this.props.comments.map(
          (comment, index) => <CComment comment={comment}
            className='cr-feedback-list__item'
            key={index} />
        )}
      </div>
    );
  }
}
