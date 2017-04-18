import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IDashboardNavbarProps {
  email: string;
  name: string;
}

export class DashboardNavbar extends React.Component<IDashboardNavbarProps, {}> {
  render() {
    return (<div>
      Logged as { this.props.name ? this.props.name : this.props.email }
      <Link to='/profile'>(profile)</Link>
    </div>);
  }
}
