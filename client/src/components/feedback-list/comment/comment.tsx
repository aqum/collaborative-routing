import * as React from 'react';
import * as classNames from 'classnames';
import './comment.scss';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';
import { IComment } from '../../../interfaces/comment';
import { CommentForm } from './comment-form/comment-form';

export interface ICommentProps {
  comment: IComment;
  className?: string;
  onSave?: Function;
  onRemove?: Function;
}

export class Comment extends React.Component<ICommentProps, {}> {
  handleOnSave(content: string) {
    if (!this.props.onSave) {
      return;
    }

    const updatedComment = Object.assign({}, this.props.comment, { content });
    this.props.onSave(updatedComment);
  }

  handleOnCancel() {
    if (!this.props.onRemove) {
      return;
    }

    this.props.onRemove(this.props.comment);
  }

  render() {
    return (
       <div className={classNames(this.props.className, 'cr-comment')}>
         <FeedbackMeta date={this.props.comment.date} />
         <div className='cr-comment__content'>
           {
             this.props.comment.isEdited ?
               <CommentForm onSave={this.handleOnSave.bind(this)}
                            onCancel={this.handleOnCancel.bind(this)} /> :
               this.props.comment.content
           }
         </div>
       </div>
    );
  }
}
