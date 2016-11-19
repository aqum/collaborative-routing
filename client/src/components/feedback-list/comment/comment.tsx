import * as React from 'react';
import * as classNames from 'classnames';
import './comment.scss';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';
import { IComment } from '../../../interfaces/comment';

export interface ICommentProps extends IComment {
  className?: string;
}

export class Comment extends React.Component<ICommentProps, {}> {
  render() {
    return (
       <div className={classNames(this.props.className, 'cr-comment')}>
         <FeedbackMeta name={this.props.author.name}
                       date={this.props.date} />
         <div className='cr-comment__content'>
           {this.props.content}
         </div>
       </div>
    );
  }
}
