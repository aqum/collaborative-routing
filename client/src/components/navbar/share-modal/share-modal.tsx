import * as React from 'react';
import { config } from '../../../../config/config';
import './share-modal.scss';

export interface IShareModalProps {
  onTokenCreate: (routeId: number) => void;
  token: string;
  routeId: number;
}

export class ShareModal extends React.Component<IShareModalProps, {}> {
  handleTokenCreate() {
    this.props.onTokenCreate(this.props.routeId);
  }

  render() {

    return (
      <div className='cr-share-modal'>
        <h2 className='cr-modal__header'>Collaborate</h2>
        <p className='cr-modal__description'>
          Share link with friends and collaborate in real-time.<br />
          They will be able to comment and leave suggestions.
        </p>
        <div className='cr-share-modal__manage'>
          { this.props.token ? this.tokenForm() : this.createTokenBtn() }
        </div>
      </div>
    );
  }

  tokenForm() {
    const tokenUrl = `${config.appUrl}/map/${this.props.routeId}?accessToken=${this.props.token}`;

    return (
      <div>
        <input className='cr-share-modal__link-input'
               disabled
               value={tokenUrl} />
        <a onClick={this.handleTokenCreate.bind(this)}>
          Revoke & create new token
        </a>
      </div>
    );
  }

  createTokenBtn() {
    return (
      <button onClick={this.handleTokenCreate.bind(this)}
              className='cr-share-modal__create-btn'>
        Create token
      </button>
    );
  }
}
