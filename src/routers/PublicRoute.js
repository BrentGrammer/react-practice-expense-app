import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// This component is used in AppRouter to redirect the user to dashboard if logged in and tries to access login page.
// Note: the component is defined on and passed in from AppRouter
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            // send logged in user to dashboard if login url is accessed
            <Redirect to="/dashboard" />       
        ) : ( 
            /* if not authenticated, then display the login page component passed in on AppRouter to <PublicRoute> instance */   
            <Component {...props} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
