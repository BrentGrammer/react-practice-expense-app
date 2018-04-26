import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

// NOTE: this component is called on the ExpenseDashboardPage parent:

//////// Andrew Mead's Way /////////

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    // used to render expense or expenses in the h1 dynamically:
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    // format expenses total with numeral (total is in int cents so /100 to get dollars):
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
           <div className="content-container">
              {/* spans added around dynamic data to target for making bold in _page-header.scss */}
              <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
              {/* div added to hold link to create expense and create space between it and the h1 and whatever else you want to include */}
              {/* class name actions is naming convention for using with the interactive actions for the page */}
              <div className="page-header__actions">
                 <Link className="button" to="/create">Add Expense</Link>
              </div>
           </div>                 
        </div>
    );
};
const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {              
        expenseCount: visibleExpenses.length,
        // you don't want to total all expenses with state.expenses, only the filtered expenses by 
        // passing in the const above which was assigned to the expense selector which grabs expenses 
        // based on the filters set:
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);

// const ExpensesSummary = (props) => (
//     <div>
//         <h1>Expenses Summary: </h1>
//         <p>Total Expenses: {props.expenses.length}</p>
//         {/* Grab the total from the selector return value passed in the props with mapStateToProps and format it with numeral.js: */}
//         <p>Total sum: {numeral(props.expenses_total/ 100).format('$0,0.00')}</p>       
//     </div>
// );
// // This defines what the component has access to in the store and passes the key/values as props to the component 
// // (props on the component connected will = the state object with the key/values specified here).
// const mapStateToProps = (state) => {
//     return {   
           // // assign a const to the filtered list of expenses by using the expenses selector with the filters passed in:
           // const visibleExpenses = selectExpenses(state.expenses, state.filters);   
//         // expenses is set to use the selector which uses .filter() to filter returned expenses based on the state.filters props
//         expenses: selectExpenses(state.expenses, state.filters),
//         // use the filtered expenses pulled with the expenses selector assigned to the const above:
//         expenses_total: selectExpensesTotal(visibleExpenses)
//     };
// };
// // connect() returns the function to use to make the HOC, so pass in the comp to the second call which would be calling
// // the returned function.
// export default connect(mapStateToProps)(ExpensesSummary);