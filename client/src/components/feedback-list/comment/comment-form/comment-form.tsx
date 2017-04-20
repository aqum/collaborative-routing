import * as React from 'react';
import { findDOMNode } from 'react-dom';
import './comment-form.scss';

export interface ICommentFormProps {
  onSave: Function;
  onCancel: Function;
  content: string;
  placeholder: string;
  isExpanded?: boolean;
  focusOnInit?: string;
}

export interface ICommentFormState {
  content?: string;
  isExpanded?: boolean;
}

export class CommentForm extends React.Component<ICommentFormProps, ICommentFormState> {
  constructor(props) {
    super();
    this.state = {
      content: '',
      isExpanded: !!props.isExpanded,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      isExpanded: !!props.isExpanded,
    });
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
    this.setState({
      content: '',
    });
  }

  expand() {
    this.setState({ isExpanded: true });
  }

  gracefullyShrink() {
    if (!this.state.content && !this.props.isExpanded) {
      this.setState({ isExpanded: false });
    }
  }

  componentDidMount() {
    if (this.props.focusOnInit) {
      findDOMNode<any>(this.refs['field']).focus();
    }
  }

  renderActions() {
    return (<div className='cr-comment-form__actions'>
      <button className='cr-comment-form__btn'
              type='submit'>
        Save
      </button>
      {
        this.props.onCancel ?
          <button className='cr-comment-form__btn'
                  type='button'
                  onClick={this.props.onCancel}>
            Cancel
          </button> :
          null
      }
    </div>);
  }

  render() {
    return (
       <form className='cr-comment-form'
             onSubmit={this.handleSubmit.bind(this)}>
         <textarea className='cr-comment-form__field'
                   value={this.state.content}
                   ref='field'
                   placeholder={this.props.placeholder}
                   onChange={this.handleContentChange.bind(this)}
                   onFocus={this.expand.bind(this)}
                   onBlur={this.gracefullyShrink.bind(this)} />
         { this.state.isExpanded ? this.renderActions() : null }
       </form>
    );
  }
}
