import * as React from 'react';
import * as classNames from 'classnames';
import { get } from 'lodash';
import './comment.scss';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';
import { IComment } from '../../../interfaces/comment';
import { CommentForm } from './comment-form/comment-form';
import { CommentReply } from './comment-reply/comment-reply';

export interface ICommentProps {
  comment: IComment;
  className?: string;
  onSave?: (comment: IComment) => void;
  onRemove?: (comment: IComment) => void;
  onReply?: (content: string, target: IComment) => void;
}

export class Comment extends React.Component<ICommentProps, {}> {
  handleFormSubmit(content: string) {
    const updatedComment = Object.assign({}, this.props.comment, { content });

    if (this.props.comment.isEdited) {
      return this.props.onSave(updatedComment);
    }

    return this.props.onReply(content, this.props.comment);
  }

  handleOnCancel() {
    if (!this.props.onRemove) {
      return;
    }

    this.props.onRemove(this.props.comment);
  }

  renderReplies() {
    return (
       <div className='cr-comment__replies'>
         { this.props.comment.replies.map(
           reply => <CommentReply comment={reply} key={reply.id} />,
         ) }
       </div>
    );
  }

  renderForm() {
    const isEdited = this.props.comment.isEdited;
    return (
      <div className='cr-comment__form'>
        <CommentForm
          onSave={this.handleFormSubmit.bind(this)}
          onCancel={isEdited ? this.handleOnCancel.bind(this) : null}
          isExpanded={isEdited}
          placeholder={isEdited ? 'Comment' : 'Reply...' }
        />
      </div>
    );
  }

  render() {
    return (
       <div className={classNames(
         this.props.className,
         'cr-comment',
         this.props.comment.isSaving ? 'cr-comment--saving' : null,
       )}>
         <div className='cr-comment__inner'>
           <FeedbackMeta
             date={this.props.comment.date}
             name={get(this.props, 'comment.user.name')}
           />
           { this.props.comment.isEdited ?
               null :
               <div className='cr-comment__content'>
                 { this.props.comment.content }
               </div>
           }
         </div>

         { this.props.comment.replies.length > 0 ? this.renderReplies() : null }

         { this.renderForm() }
       </div>
    );
  }
}
