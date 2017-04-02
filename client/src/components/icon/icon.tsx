import * as React from 'react';

export interface IIconProps {
  svg: string;
}

export class Icon extends React.Component<IIconProps, {}> {
  icon() {
    return {
      __html: this.props.svg,
    };
  }

  render() {
    return (
      <span dangerouslySetInnerHTML={this.icon()}></span>
    );
  }
}
