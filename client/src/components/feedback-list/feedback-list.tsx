import * as React from 'react';
import * as classNames from 'classnames';
import './feedback-list.scss';
import { CComment } from '../../containers/c-comment';
import { IComment } from '../../interfaces/comment';
import { ISuggestion } from '../../interfaces/suggestion';
import { Suggestion } from './suggestion/suggestion';

export interface IFeedbackList {
  className?: any;
  comments: IComment[];
  suggestions: ISuggestion[];
}

export class FeedbackList extends React.Component<IFeedbackList, {}> {
  render() {
    return (
      <div className={classNames(this.props.className, 'cr-feedback-list')}>
        {this.props.suggestions.map(
          (suggestion, index) =>
            <div className='cr-feedback-list__item'
                 key={index}>
              <Suggestion suggestion={suggestion} />
            </div>
        )}

        {this.props.comments.map(
          (comment, index) => <CComment comment={comment}
            className='cr-feedback-list__item'
            key={index} />
        )}
      </div>
    );
  }
}
