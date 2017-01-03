import * as React from 'react';

import './app.scss';
import { CFeedbackList } from '../../containers/c-feedback-list';
import { CMap } from '../../containers/c-map';
import { Loader } from '../loader/loader';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-app'>
        <Loader className='cr-app__loader'
                isVisible={true} />
        <CFeedbackList className='cr-app__feedback-list' />
        <CMap className='cr-app__map' />
      </div>
    );
  }
}
