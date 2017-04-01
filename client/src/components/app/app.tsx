import * as React from 'react';

import './app.scss';
import { CFeedbackList } from '../../containers/c-feedback-list';
import { CMap } from '../../containers/c-map';
import { Sidebar } from '../sidebar/sidebar';
import { CModeSwitch } from '../../containers/c-mode-switch';
import { CNavbar } from '../../containers/c-navbar';

export interface IAppProps {
  location: any;
  onTokenMatch: (token: string) => void;
}

export class App extends React.Component<IAppProps, {}> {
  routeId: number;

  constructor({ match }) {
    super();

    this.routeId = parseInt(match.params.routeId, 10);
  }

  componentWillMount() {
    const queryStr = this.props.location.search;
    const tokenMatch = queryStr.match(/accessToken=([^&]*)/);
    if (tokenMatch) {
      this.props.onTokenMatch(tokenMatch[1]);
    }
  }

  render() {
    return (
      <div className='cr-app'>
        <CNavbar className='cr-app__navbar' />
        <div className='cr-app__inner'>
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
      </div>
    );
  }
}
