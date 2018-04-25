import React from 'react';
// BrowserRouter import removed and replaced with Router to access npm history api and pass in custom history value:
import { Router, Route, Switch } from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
// function imported from npm history in order to create history to redirect user with history.push in app.js in the 
// login/logout conditional (using firebase.auth().onAuthStateChanged()):
import createHistory from 'history/createBrowserHistory';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
// this is for making private routes only accessible when user is logged in:
import PrivateRoute from './PrivateRoute';

// npm history tool installed lets you create your own custom history with createHistory() and then you can export it to 
// use outside of routed components:
export const history = createHistory();

 const AppRouter = () => (
   // BrowserRouter changed to regular <Router> to use custom history created instead of the browser history which <BrowserRouter>
   // uses by default.  This is done to allow for the use of history.push() outside of routed components to redirect user,
   // i.e. in app.js to redirect the user if loggedin/logged out with history.push():

   // with <Router> you can set a history prop to the custom history created with createHistory():
    <Router history={history}>
       <div>
         <Switch>
           <Route path="/" component={LoginPage} exact={true} />
           <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
           <PrivateRoute path="/create" component={AddExpensePage} />
           <PrivateRoute path="/edit/:id" component={EditExpensePage} />
           <Route path="/help" component={HelpPage} />
           <Route component={NotFoundPage} />
         </Switch>
       </div>
    </Router>
 );

 export default AppRouter;