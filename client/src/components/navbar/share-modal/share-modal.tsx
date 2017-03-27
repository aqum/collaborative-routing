import * as React from 'react';
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
      <div>
        <h2 className='cr-modal__header'>Collaborate</h2>
        <p className='cr-modal__description'>
          Share link with friends and collaborate in real-time.<br />
          They will be able to comment and leave suggestions.
        </p>
        { !this.props.token ?
            (<button type='button'
                    onClick={this.handleTokenCreate.bind(this)}>
              Create token
            </button>) :
            (<input className='cr-share-modal__link-input'
                   disabled
                   value='http://test.co/asd' />) }
      </div>
    );
  }
}
