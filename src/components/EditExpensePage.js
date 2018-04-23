import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
    <div>
       <ExpenseForm 
           // Pass down the expense object from props to the ExpenseForm component to populate the edit form with 
           // current values 
           expense={props.expense}
           // the object expense contains the user submitted form data taken from the local state of the form component
           // on ExpenseForm and takes the passed in object containing that data from the props.onSubmit method passed into
           // Expenseform from here.
           // the expense argument is populated by the expense form child component with the user entered form data
           onSubmit={(expense) => {
               // dispatch action to edit the expense - edit action takes in the id and an object of updated properties
               // the expense object is dispatched to the expense reducer listening for edit expense action

               // Edit Expense Page is giving the form child a onSubmit function which the child form calls when the form 
               // is submitted and passes in the form data from it's local state as the argument.
               // The function disatches the passed in form data to the store to update the item:
                
               props.dispatch(editExpense(props.expense.id, expense));
               props.history.push('/');
           }}
       />
       <button onClick={() => {
          props.dispatch(removeExpense({ id: props.expense.id }));
          props.history.push('/');
        }}
       >Remove</button>
    </div>
);

// search the expenses in state for an id that matches
// access the current props in the component in the second argument passed in to grab the id to search for.
// the id is got from the expense list item link to this page which is accessed with the match.params from the dynamic
// url (this is builtin functionality provided by react router)
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

// pass in mapStateToProps to tack on the expense property returned above onto the component props (accessed as props.expense)
export default connect(mapStateToProps)(EditExpensePage);
