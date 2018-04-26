import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// destructure the passed in dispatch props setup in mapDispatchToProps and pull the startLogout prop to use in onClick for logout btn:
export const Header = ({ startLogout }) => (
    <header className="header">
      <div className="content-container">
         {/* This div is made to use flexbox on in css to line the content left to right in the header bar */}
         <div className="header__content">
          <Link className="header__title" to="/dashboard">  
              <h1>Expensify</h1>
          </Link>
          {/* Logout Button in Nav */}
          {/* using the button base style class and a BEM modifier (baseclass--modifiername) to remove background and change color */}
          <button className="button button--link" onClick={startLogout}>Logout</button>
         </div>
      </div>
    </header>
 );

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);


 /**
  * Header before nav bar links were removed.
  */
//  const mapDispatchToProps = (dispatch) => ({
//     startLogout: () => dispatch(startLogout())
//  });
//  export default connect(undefined, mapDispatchToProps)(Header);

//  // destructure the passed in dispatch props setup in mapDispatchToProps and pull the startLogout prop to use in onClick for logout btn:
// export const Header = ({ startLogout }) => (
//   <header>
//     <h1>Expensify</h1>
//     <NavLink to="/dashboard" activeClassName="is-active">Home</NavLink>
//     <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
//     {/* Logout Button in Nav */}
//     <button onClick={startLogout}>Logout</button>
//   </header>
// );

// const mapDispatchToProps = (dispatch) => ({
//   startLogout: () => dispatch(startLogout())
// });
// export default connect(undefined, mapDispatchToProps)(Header);

