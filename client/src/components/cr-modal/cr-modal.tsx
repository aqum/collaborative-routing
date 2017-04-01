import * as React from 'react';
import * as classNames from 'classnames';
import './cr-modal.scss';

const Modal = require('react-modal');

export class CrModal extends React.Component<{}, {}> {
  render() {
    const props = Object.assign({}, this.props, {
      className: 'cr-modal',
      overlayClassName: 'cr-modal__overlay',
    });

    return React.createElement(Modal, props);
  }
}
