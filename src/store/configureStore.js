// applyMiddleware allows you to add middleware (i.e. redux-thunk) to your store
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

// This needs to be added to use redux-thunk middleware and not lose functionality of chrom redux devtools ext:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Create a new store and pass in the reducer function by reference:
export default () => {
    const store = createStore(
        // This combines the reducers which will listen for dispatched actions that cause returned objects to be used in
        // each of the keys specified in the store object:
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        // Used to use middleware redux-thunk which allows for dispatching functions to use with db integration: 
        // needed to be wrapped in a call to composeEnhancers in order to maintain functionality of chrome redux devtools ext
        composeEnhancers(applyMiddleware(thunk)),
        // Used to make devtools in Chrome work to view store etc. before middleware was used:
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    );

    return store;
};