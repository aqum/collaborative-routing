import * as React from 'react';
import { Link } from 'react-router-dom';
import './dashboard-navbar.scss';

export interface IDashboardNavbarProps {
  email: string;
  name: string;
}

export class DashboardNavbar extends React.Component<IDashboardNavbarProps, {}> {
  render() {
    return (
      <div className='cr-dashboard-navbar'>
        Logged as { this.props.name } <Link to='/account'>(account)</Link>
      </div>
    );
  }
}
