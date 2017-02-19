import * as React from 'react';
import * as classNames from 'classnames';
import './button-group.scss';

export interface IButtonGroupItem {
  label: string;
  onClick: Function;
  isActive?: boolean;
}

export interface IButtonGroup {
  buttons: IButtonGroupItem[];
}

export interface IButtonGroupState {
  activeButton?: IButtonGroupItem;
}

export class ButtonGroup extends React.Component<IButtonGroup, IButtonGroupState> {
  constructor() {
    super();
    this.state = {
      activeButton: null,
    };
  }

  componentWillMount() {
    this.setState({
      activeButton: this.props.buttons.find(btn => btn.isActive),
    });
  }

  isButtonActive(button: IButtonGroupItem) {
    return this.state.activeButton === button;
  }

  handleClick(button: IButtonGroupItem) {
    this.setState({
      activeButton: button,
    });
    button.onClick();
  }

  render() {
    return (
      <div className='cr-button-group'>
        { this.props.buttons.map((button, index) =>
          <button className={ classNames(
                    'cr-button-group__button',
                    { 'cr-button-group__button--active': this.isButtonActive(button) }
                  ) }
                  onClick={ () => this.handleClick(button) }
                  key={ index }>
            { button.label }
          </button>
        ) }
      </div>
    );
  }
}
