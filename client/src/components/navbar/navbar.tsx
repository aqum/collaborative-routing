import * as React from 'react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CrModal } from '../cr-modal/cr-modal';
import { CShareModal } from '../../containers/c-share-modal';
import { Icon } from '../icon/icon';
import './navbar.scss';

export interface INavbar {
  className?: any;
  routeTitle: string;
}

export interface INavbarState {
  shareModalVisible: boolean;
}

export class Navbar extends React.Component<INavbar, INavbarState> {
  constructor() {
    super();
    this.state = {
      shareModalVisible: false,
    };
  }

  toggleShareModal(state: boolean = !this.state.shareModalVisible) {
    this.setState({
      shareModalVisible: state,
    });
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'cr-navbar')}>
        <Link to='/'
              className='cr-navbar__dashboard-link'>
          <Icon svg={require('../../assets/icons/navigate-before.svg')} />
        </Link>
        <div className='cr-navbar__route-title'>{ this.props.routeTitle }</div>
        <button type='button'
                className='cr-navbar__share'
                onClick={() => this.toggleShareModal(true)}>
          Share
        </button>
        <CrModal isOpen={this.state.shareModalVisible}
                 contentLabel={'Share'}
                 onRequestClose={() => this.toggleShareModal(false)}>
          <CShareModal />
        </CrModal>
      </div>
    );
  }
}
