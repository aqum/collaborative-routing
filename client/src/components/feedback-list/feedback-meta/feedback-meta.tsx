import * as React from 'react';
import { Moment } from 'moment';

import './feedback-meta.scss';

export interface IFeedbackMeta {
  avatarUrl: string;
  name: string;
  date: Moment;
}

export class FeedbackMeta extends React.Component<IFeedbackMeta, {}> {
  render() {
    return (
       <div className='cr-feedback-meta'>
         <div className='cr-feedback-meta__avatar'>
           <img className='cr-feedback-meta__avatar-img'
                src={this.props.avatarUrl} />
         </div>
         <div>
           <h5 className='cr-feedback-meta__name'>{this.props.name}</h5>
           <h6 className='cr-feedback-meta__date'>{this.props.date.fromNow()}</h6>
         </div>
       </div>
    );
  }
}
