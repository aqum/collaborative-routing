import * as React from 'react';
import * as moment from 'moment';

import './comment.scss';
import { FeedbackMeta } from '../feedback-meta/feedback-meta';

export class Comment extends React.Component<{}, {}> {
  render() {
    return (
       <div className='cr-comment'>
         <FeedbackMeta name='Maria'
                       date={moment().subtract(10, 'days')} />
         <div className='cr-comment__content'>
           Some content
         </div>
       </div>
    );
  }
}
