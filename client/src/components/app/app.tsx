import * as React from 'react';

import './app.scss';
import { CFeedbackList } from '../../containers/c-feedback-list';
import { CMap } from '../../containers/c-map';
import { CLoader } from '../../containers/c-loader';
import { Sidebar } from '../sidebar/sidebar';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-app'>
        <Sidebar className='cr-app__sidebar' />
        <div className='cr-app__main'>
          <CLoader className='cr-app__loader' />
          <CFeedbackList className='cr-app__feedback-list' />
          <CMap className='cr-app__map' />
        </div>
      </div>
    );
  }
}
