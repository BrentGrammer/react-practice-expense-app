import React from 'react'; 
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Ingo</h1>
        <p>info is {props.info}</p>
    </div>
);

// function will be called with the component that is wrapped in the HOC - you can call it with the component passed in
// this function will return an alternative version of the component passed in which will be a Higher Order Component
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        // return what you want to have render:
        <div>
            {props.isAdmin && <p>This is the admin warning</p>}
            {/* Create an instance of the passed in component to wrap, props is an object passed in, so you can use the 
                spread operator to spread those key/values out and they function as passed in props */}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>You are Not Authorized</p>)}
        </div>
    );
};

// this will return the component passed in as an alternative component which is a higher order component
//const AdminInfo = withAdminWarning(Info);

const AuthInfo  = requireAuthentication(Info);


// Call an instance of the return of the HOC function to render. 
// Note: you can also pass props into the HOC to reference, for instance to determine whether to display parts using isAdmin to a boolean, etc.:
//ReactDOM.render(<AdminInfo isAdmin={false} info="information" />, document.getElementById('app'));

ReactDOM.render(<AuthInfo isAuthenticated={false} info="information" />, document.getElementById('app'));