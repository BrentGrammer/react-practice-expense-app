import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, startEditExpense } from '../actions/expenses';

// This page is routed to and rendered when user clicks <Link> which is mapped to /edit/:expenseId in the router.
// the <Link> is inside <ExpenseListItem> displayed in the <ExpenseList> on <ExpensesDashBoardPage>

const EditExpensePage = (props) => (
    <div>
       <div className="page-header">
         <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
         </div>
       </div>
       <div className="content-container">
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
                // is submitted and passes in the form data from it's local state as the argument into onSubmit which is
                // then passed into editExpense in the dispatch call.
                // The function disatches the passed in form data to the store to update the item.
                // The expense id is coming from the connection to the store and pulling a matched id with the url param
                // which this component then has access to in props: 
                // the expense object is used to overwrite props on the state expense obj in the reducer which spreads them
                // out on the state object.
                props.dispatch(startEditExpense(props.expense.id, expense));
                props.history.push('/');
            }}
        />
        <button className="button button--secondary" onClick={() => {
            props.dispatch(startRemoveExpense({ id: props.expense.id }));
            props.history.push('/');
            }}
        >Remove Expense</button>
       </div>
    </div>
);

// Search the expenses in global store state for an id that matches.
// Access the current props in the component in the second argument passed in to grab the id to search for.
// the id is got from the expense list item link to this page which is accessed with the props.match.params from the dynamic
// url (this is builtin functionality provided by react router)

/** 
 * The url param id is set by <ExpenseList> passing id to ExpenseListItem where that puts it into the Link url 
 * as the url id param, which when clicked, renders this component and is accessible in the builtin props.match.params.
 * Then, this connected component to the store uses it to find a match with an expense in the store and put that match 
 * in it's props where it can use it to pass to the async redux action generator dispatched that updates the db and 
 * store.
 */
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

// pass in mapStateToProps to tack on the expense property returned above onto the component props (accessed as props.expense)
export default connect(mapStateToProps)(EditExpensePage);
