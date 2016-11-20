import * as React from 'react';
import { findDOMNode } from 'react-dom';
import './comment-form.scss';

export interface ICommentForm {
  content?: string;
  onSave?: Function;
}

export class CommentForm extends React.Component<ICommentForm, ICommentForm> {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }

  handleContentChange(ev) {
    this.setState({ content: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (!this.props.onSave) {
      return;
    }

    this.props.onSave(this.state.content);
  }

  componentDidMount() {
    findDOMNode<any>(this.refs['field']).focus();
  }

  render() {
    return (
       <form className='cr-comment-form'
             onSubmit={this.handleSubmit.bind(this)}>
         <textarea className='cr-comment-form__field'
                   value={this.state.content}
                   ref='field'
                   onChange={this.handleContentChange.bind(this)} />
           <div className='cr-comment-form__actions'>
             <button className='cr-comment-form__btn'
                     type='submit'>
               Save
             </button>
           </div>
       </form>
    );
  }
}
