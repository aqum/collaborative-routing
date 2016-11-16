import * as React from 'react';

import './app.scss';
import { Map } from '../map/map';
import { CFeedbackList } from '../../containers/feedback-list';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-app'>
        <CFeedbackList className='cr-app__feedback-list' />
        <Map className='cr-app__map' />
      </div>
    );
  }
}
