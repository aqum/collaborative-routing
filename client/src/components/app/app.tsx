import * as React from 'react';

import './app.scss';
import { CFeedbackList } from '../../containers/c-feedback-list';
import { CMap } from '../../containers/c-map';
import { Sidebar } from '../sidebar/sidebar';
import { CModeSwitch } from '../../containers/c-mode-switch';

export class App extends React.Component<{}, {}> {
  routeId: number;

  constructor({ match }) {
    super();

    this.routeId = parseInt(match.params.routeId, 10);
  }

  render() {
    return (
      <div className='cr-app'>
        <Sidebar className='cr-app__sidebar' />
        <div className='cr-app__main'>
          <div className='cr-app__floating-right'>
            <div className='cr-app__floating-item'>
              <CModeSwitch />
            </div>
            <CFeedbackList />
          </div>
          <CMap className='cr-app__map'
                routeId={this.routeId} />
        </div>
      </div>
    );
  }
}
