//import third party package installed with npm:
import React from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// add import of history from AppRouter.js to use custom history API in authStateChanged conditional to redirect user
// if logged in/out:
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'; // lives in node_modules/ folder so no need to reference the folder - import looks automatically there
import './styles/styles.scss';
import { firebase } from './firebase/firebase';

import './firebase/firebase';

// from function export in \store\configureStore.js: returns a created store object set up with createStore() and 
// combineReducers() builtin redux functions, and connected to reducers.
const store = configureStore();

// add two expenses - example of using store redux method, dispatch, to send an action generator object to be caught
// by the reducers in the store.
// store.dispatch(addExpense({ description: 'Water Bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const jsx = (
    <Provider store={store}>
       <AppRouter />
    </Provider>   
);

// You only want to render the app one time based on AuthState and not re-render it unecessarily.  Create a let set to a
// flag for whether the app has rendered (use let to allow to enable re-assigning the value)
let hasRendered = false;
// create a function that renders the app, but only conditionally if the app hasn't rendered already to be used in the 
// AuthState conditional to redirect user based on logged in/logged out below this:
const renderApp = () => {
    if (!hasRendered) {
        // if app has not rendered, then render the app, otherwise do nothing if it has already rendered:
        ReactDOM.render(jsx, document.getElementById('app'));
        // change flag to true:
        hasRendered = true;     
    }
};

// Render a loading page while the action startSetExpenses is fetching data from db:
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// onAuthStateChanged runs callback when authentication status changed (authenticated to unauthenticated or vice versa):
// if there is a user it is passed in as the arg
// (The function firebase.auth().onAuthStateChanged() keeps track of the state of authentication)
firebase.auth().onAuthStateChanged((user) => {
    // check if there is a user set on auth state change and logged in (user will not be null)
    if (user) {
        //console.log('user', user.uid); // unique user id provided by auth is stored in user.uid - this will be tracked in redux store to track authentication for page access.
        // user.uid is created when user clicks login btn on Loginpage which fires startLogin action in actions/auth.js, and firebase.auth signs them in with google, then the id is stored in the store with the login action fired by startLogin
        // After user is logged in (user will have a value), dispatch the login action which sends user.uid to the store
        // to keep track of it for accessing private protected routes in the app while logged in:
        store.dispatch(login(user.uid));
    
        // when the dispatch to get expenses from db is complete, then render the page with the fetched expenses from db:
        // (Note: the reason you can call .then() on startSetExpenses dispatch is because it is returning the dispatch call 
        // to dispatch setExpenses inside startSetExpenses on actions/expenses.js) 
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            // check if user is on login page and redirect if they are to the expense dashboard:
            // this is done so that if there is a hard refresh on a page other than login while user is logged in,
            // they will not be redirected to the dashboard, but stay on the current page.
            // users current url location can be accessed in the history api with .location.pathname
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        // dispatch logout action which removes user.uid from store and replaces store auth prop with empty object:
        store.dispatch(logout());
        // render the login page jsx which contains component to render in AppRouter instance when '/' url is hit. 
        // This needs to be done, since if user logs out and is sent to '/' it will just show the Loading... set 
        // to render outside of this conditional indefinitely.
        renderApp();
        // use imported history API after installing the npm history tool and modifying AppRouter.js to allow access
        // to history methods to redirect user and use outside of routed components:
        history.push('/');
    }   
});


