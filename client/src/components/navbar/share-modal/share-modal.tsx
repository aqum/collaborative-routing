import * as React from 'react';
import './share-modal.scss';

export class ShareModal extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h2 className='cr-modal__header'>Collaborate</h2>
        <p className='cr-modal__description'>
          Share link with friends and collaborate in real-time.<br />
          They will be able to comment and leave suggestions.
        </p>
        <input className='cr-share-modal__link-input'
               disabled
               value='http://test.co/asd' />
      </div>
    );
  }
}
