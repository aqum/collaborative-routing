import * as React from 'react';

import './comment.scss';

export class Comment extends React.Component<{}, {}> {
  render() {
    return (
       <div className='cr-comment'>
         <div className='cr-comment__content'>
           Some content
         </div>
       </div>
    )
  }
}
