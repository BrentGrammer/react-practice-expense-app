import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Parent is ExpensesDashboardPage

// ExpenseList is getting props from the connect to the store (grabs expenses using the selector to query the state
// from the store to grab items based on filters set on the ExpenseDashboard using the ExpenseListFilters child instance
// which dispatches filter actions to the filters reducer to set them in the store state - )
// Note: the unconnected expense list is exported as a named export for use with jest testing.
export const ExpenseList = (props) => (
    <div className="content-container">
       <div className="list-header">
          {/* Expenses div displayed only on mobile screens to replace Expense/Amount divs format.
              visibility rules set in styles/components/_visibility.scss */}
          <div className="show-for-mobile">Expenses</div>
          <div className="show-for-desktop">Expense</div>
          {/* Amount div only dislayed on desktop screens */}
          <div className="show-for-desktop">Amount</div>
       </div>
       {/* Added div to set bottom margin so when screen is reduced vertically, items are not pushed against the bottom edge of screen */}
       <div className="list-body">
        {
            props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                <span>No Expenses</span>
                </div>
            ) : (
            props.expenses.map((expense) => {
                // instead of spreading props object, spread the passed in expense object (which is the expense from props),
                // since the context has changed.
                return <ExpenseListItem key={expense.id} {...expense} />;
            })
            )
        }
       </div>
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
