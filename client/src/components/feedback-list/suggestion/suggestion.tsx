import * as React from 'react';
import { ISuggestion } from '../../../interfaces/suggestion';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';
import './suggestion.scss';

export interface ISuggestionProps {
  suggestion: ISuggestion;
}

export class Suggestion extends React.Component<ISuggestionProps, {}> {
  render() {
    return (
      <div className='cr-suggestion'>
        <FeedbackMeta date={this.props.suggestion.date} />
         <div className='cr-suggestion__content'>
           { this.props.suggestion.waypoints
               .map(suggestion => `${suggestion.lat.toFixed(2)} ${suggestion.lng.toFixed(2)}`)
               .join(',') }
         </div>
      </div>
    );
  }
}
