import * as React from 'react';
import * as classNames from 'classnames';
import { CrModal } from '../cr-modal/cr-modal';
import { CShareModal } from '../../containers/c-share-modal';
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
