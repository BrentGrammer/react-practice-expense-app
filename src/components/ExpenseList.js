import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// ExpenseList is getting props from the connect to the store (grabs expenses using the selector to query the state
// from the store to grab items based on filters set on the ExpenseDashboard using the ExpenseListFilters child instance
// which dispatches filter actions to the filters reducer to set them in the store state - )
const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => {
            // instead of spreading props object, spread the passed in expense object (which is the expense from props), 
            // since the context has changed.
            return <ExpenseListItem key={expense.id} {...expense} />;
        })}       
    </div>
);
// This defines what the component has access to in the store and passes the key/values as props to the component 
// (props on the component connected will = the state object with the key/values specified here).
const mapStateToProps = (state) => {
    return {
        // expenses is set to use the selector which uses .filter() to filter returned expenses based on the state.filters props
        expenses: selectExpenses(state.expenses, state.filters)

    };
};
// connect() returns the function to use to make the HOC, so pass in the comp to the second call which would be calling
// the returned function.
export default connect(mapStateToProps)(ExpenseList);