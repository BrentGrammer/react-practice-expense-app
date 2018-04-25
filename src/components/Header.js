import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// destructure the passed in dispatch props setup in mapDispatchToProps and pull the startLogout prop to use in onClick for logout btn:
export const Header = ({ startLogout }) => (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help Page</NavLink>
      {/* Logout Button in Nav */}
      <button onClick={startLogout}>Logout</button>
    </header>
 );

 const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
 });
 export default connect(undefined, mapDispatchToProps)(Header);
