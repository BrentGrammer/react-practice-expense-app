import React from 'react'; 
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

// This component is routed to and rendered on request to '/' as the landing page:
// arg is destructuring the props passed in by connect() mapDispatchToProps to get access to the startLogin action 
// which is used in the onClick for the login button:
export const LoginPage = ({ startLogin }) => (
    <div>
{/* onClick is referencing the destructured dispatch prop setup with mapDispatchToProps to fire the startLogin action: */}
       <button onClick={startLogin}>Login</button> 
    </div>
);

// mapDispatchToProps implicitly returns an object and sets functions that dispatch actions to each property name which 
// can be accessed in props.[dispatchName] in the component:
// the function set to the property dispatches the imported async action startLogin:
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()) // (no semicolon because this is inside an object key, not a func body and with ES6 arrow func syntax, curly brackets are not required here)
});

export default connect(undefined, mapDispatchToProps)(LoginPage);







// // // // // // // // // // // // // // // //

/**
 * state class component version (not necessary in this app)
 */

// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             username: '',
//             password: ''
//         };
//     }
//     render() {
//         return (
//             <div>
//                 <form>
//                     <input type="text" placeholder="Enter Username" autoFocus />
//                     <input type="password" placeholder="Enter Password" />
//                     <button>Login</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default LoginPage;