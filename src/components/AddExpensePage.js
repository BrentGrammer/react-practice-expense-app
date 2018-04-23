import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

//component converted to class component to avoid inline functions (if it were a stateless functional comp)
export class AddExpensePage extends React.Component {
  /* on valid form submission this expense argument contains an object of all form inputs submitted passed in 
    to the onSubmit method handler on the ExpenseForm.js child component */
  onSubmit = (expense) => {
      // (the props are mapped to dispatch calls defined below with mapDispatchToProps)
      // startAddExpense asynch redux action gen is called which 
    this.props.startAddExpense(expense);
    // redirect to home page:
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
// with mapDispatchToProps, an object is returned with props that call dispatch, so in the component you can just 
// reference the prop to dispatch the action with prop.[propName holding the dispatch defined below):
// Note: (dispatch is passed in by connect() which allows access to the redux dispatch method)
const mapDispatchToProps = (dispatch) => ({
  // expense arg is a placeholder which will accept a passed in expense object from form data passed in by the component
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

// the first arg is mapStateToProps which is not needed in this component - so it is set to undefined
export default connect(undefined, mapDispatchToProps)(AddExpensePage);





/**
 * From a previous version in the course:
 */

// const AddExpensePage = (props) => (
//     <div>
//        <h1>Add Expense</h1>
//        {/* on valid form submission this argument contains an object of all form inputs submitted passed in 
//            to the onSubmit method handler on the ExpenseForm.js child component */}
//        <ExpenseForm onSubmit={(expense) => {
//            // expense holds the collected form data on ExpenseForm in object structure to use with the action generator:
//             props.dispatch(addExpense(expense));
//             // use builtin prop methods given from React Router to components rendered in AppRouter:
//             // argument is a string representing the relative path to the page to redirect to.
//             props.history.push('/');
//        }}/>
//     </div>
// );

// export default connect()(AddExpensePage);