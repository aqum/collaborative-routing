import * as React from 'react';

import { Comment } from './comment/comment';

export interface IFeedbackList {
  className: any;
}

export class FeedbackList extends React.Component<IFeedbackList, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <Comment />
      </div>
    );
  }
}
