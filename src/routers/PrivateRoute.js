import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import the header to put in the Private Route components so it doesn't show on the login page.
import Header from '../components/Header';
// This component is used in AppRouter.js to make routes private and only accessible if the user is logged in:
// Destructure the props from mapStateToProps and from those passed in on AppRouter.js.  Since the component will
// be a capital letter at the start, you can set the variable name to hold the value of the component prop to a name with
// a capital letter.
// the ...rest operator takes all of the other props not destructured (like path, exact, builtin props provided by ReactRouter etc.)
// and puts them all in a variable called rest.
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    //make instance of <Route /> and pass in the rest props (from AppRouter.js) and define the component prop separately
    // with conditional logic in a function.  Pass in the props from Route through to the individual component here:
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                {/* spread out the props passed through from Route so they are assigned (builtin ones like history, exact, etc.) */}
                <Component {...props} />
            </div>
        ) : (
            // use Redirect builtin component from react-router-dom (imported as named export) to redirect user if not logged in:
            <Redirect to="/" />
        )
    )} />
);
// get values from the store to determine if the user is authenticated or not:
const mapStateToProps = (state) => ({
    // Checks the user.uid value in state auth property in store if user logged in; will be undefined if the user logged out.
    // Convert value to a boolean using a double boolean flip (!!)
    // results in a true value if there is a value assigned, and a false value if it is undefined.
    isAuthenticated: !!state.auth.uid
});

//export by default the connected version of the component:
export default connect(mapStateToProps)(PrivateRoute);

