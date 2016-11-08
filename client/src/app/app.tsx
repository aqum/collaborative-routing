import * as React from 'react';

import './app.scss';
import { Map } from '../map/map';
import { FeedbackList } from '../feedback-list/feedback-list';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-app'>
        <FeedbackList className='cr-app__feedback-list' />
        <Map className='cr-app__map' />
      </div>
    );
  }
}
