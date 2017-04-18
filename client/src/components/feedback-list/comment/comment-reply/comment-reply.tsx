import * as React from 'react';
import * as classNames from 'classnames';
import { get } from 'lodash';
import { FeedbackMeta } from '../../feedback-meta/feedback-meta';
import { IComment } from '../../../../interfaces/comment';

import './comment-reply.scss';

export interface ICommentReplyProps {
  comment: IComment;
  className?: string;
}

export class CommentReply extends React.Component<ICommentReplyProps, {}> {
  render() {
    return (
       <div className={classNames(
         this.props.className,
         'cr-comment-reply',
         this.props.comment.isSaving ? 'cr-comment-reply--saving' : null
       )}>
         <FeedbackMeta
           date={this.props.comment.date}
           name={get(this.props, 'comment.user.name')}
         />
         <div className='cr-comment__content'>
           { this.props.comment.content }
         </div>
       </div>
    );
  }
}
