import * as React from 'react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CrModal } from '../cr-modal/cr-modal';
import { CShareModal } from '../../containers/c-share-modal';
import { Icon } from '../icon/icon';
import { debounce } from 'lodash';
import './navbar.scss';

export interface INavbar {
  className?: any;
  routeTitle: string;
  onTitleChange: (title: string) => void;
}

export interface INavbarState {
  shareModalVisible?: boolean;
  routeTitle?: string;
}

export class Navbar extends React.Component<INavbar, INavbarState> {
  debouncedTitleChange;

  constructor(props) {
    super();
    this.state = {
      shareModalVisible: false,
      routeTitle: props.routeTitle || '',
    };
    this.debouncedTitleChange = debounce(props.onTitleChange, 300);
  }

  componentWillReceiveProps({ routeTitle }) {
    if (routeTitle) {
      this.setState({ routeTitle });
    }
  }

  toggleShareModal(state: boolean = !this.state.shareModalVisible) {
    this.setState({
      shareModalVisible: state,
    });
  }

  handleTitleChange(ev) {
    const routeTitle = ev.target.value;
    this.setState({ routeTitle });
    this.debouncedTitleChange(routeTitle);
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'cr-navbar')}>
        <Link
          to='/'
          className='cr-navbar__dashboard-link'>
          <Icon svg={require('../../assets/icons/navigate-before.svg')} />
        </Link>
        <div className='cr-navbar__route-title'>
          <input
            className='cr-navbar__route-title-input'
            value={this.state.routeTitle}
            placeholder='Set title'
            onChange={this.handleTitleChange.bind(this)}
          />
          <Icon svg={require('../../assets/icons/edit.svg')} />
        </div>
        <button
          type='button'
          className='cr-navbar__share'
          onClick={() => this.toggleShareModal(true)}
        >
          Share
        </button>
        <CrModal
          isOpen={this.state.shareModalVisible}
          contentLabel={'Share'}
          onRequestClose={() => this.toggleShareModal(false)}
        >
          <CShareModal />
        </CrModal>
      </div>
    );
  }
}
