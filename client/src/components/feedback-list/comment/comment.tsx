import * as React from 'react';
import './comment.scss';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';
import { IComment } from '../../../interfaces/comment';

export class Comment extends React.Component<IComment, {}> {
  render() {
    return (
       <div className='cr-comment'>
         <FeedbackMeta name={this.props.author.name}
                       date={this.props.date} />
         <div className='cr-comment__content'>
           {this.props.content}
         </div>
       </div>
    );
  }
}
