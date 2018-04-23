//import third party package installed with npm:
import React from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'; // lives in node_modules/ folder so no need to reference the folder - import looks automatically there
import './styles/styles.scss';

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

// Render a loading page while the action startSetExpenses is fetching data from db:
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// when the dispatch to get expenses from db is complete, then render the page with the fetched expenses from db:
// Note: the reason you can call .then() on startSetExpenses dispatch is because it is returning the dispatch call to 
// setExpenses dispatch??? 
store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});


