import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();

class ExpenseForm extends React.Component {
    // Check if props have been passed from a parent component calling an instance of the form  (i.e. the edit expense 
    // page) to populate the form with previous data:
    // (to do this you need to use the constructor syntax)
    constructor(props) {
        // super calls the parent's constructor
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            // need to convert the int cents number to dollars and to a string
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            // if form data is passed in for an edit, then pass in date to moment to convert the unix to a date 
            // in date picker
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    // The default value of description input when it loads on the page is set to the state description value.
    // When the value of the input changes with user interaction (after it has loaded), the listener grabs the 
    // value of the event target (the input) and sets the local state key to it.
    // When the state is set, the updated parts of the component (the form) re-renders with the updated local state.
    // The input reads the updated local state for the default value, and if different from the last cache, it 
    // re-renders(re-loads) with it's default value set to the updated current local state value. 
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note })); 
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        // uses regular expression to make sure number is in xxx.xx format (decimals optional) for costs
        // validation checks if there is no amount (field is blank), or the regex matches, then you can set it
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    // takes in a moment instance as an argument (per react-dates api docs)
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }       
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        // check if required fields are empty for validation:
        if (!this.state.description || !this.state.amount) {
            // set error msg if fields are empty:
            this.setState(() => ({ error: 'Description and Amount are required Fields!' }));
        } else {
            // clear error and submit form:
            this.setState(() => ({ error: '' }));

            // call the prop function passed in from the parent (onSubmit from AddExpensesPage.js or EditExpensePage) 
            // and pass in the local state object, here made up of the user submitted values in the fields, 
            // to the argument which will be used in the call to dispatch an action on the parent page that the form is on: 
            this.props.onSubmit({
                description: this.state.description,
                // convert the submitted string for amount to a number using parseFloat:
                // multiply the number by 100 to get integer cents value for working with currency values
                amount: parseFloat(this.state.amount, 10) * 100,
                //convert the moment object to milliseconds for use with javascript by using the moment method valueOf():
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
           });
           // (this passed in function from the parent into the props which is being called here dispatches the 
           // action (shown on the parent component AddExpensesPage) with the passed in form data collected in the 
           // local state of this component)
        }
    };
    render () {
        return (
            <div>
               {this.state.error && <p>{this.state.error}</p>}
               <form onSubmit={this.onSubmit}>
                  <input 
                    type="text"
                    placeholder="Description"
                    // puts the cursor in the field when user visits page
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                  />
                  <input 
                    type="number"
                    placeholder="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                  />
                  <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused} 
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                  />
                  <textarea
                     placeholder="Note for Expense (optional)"
                     value={this.state.note}
                     onChange={this.onNoteChange}
                  >               
                  </textarea>
                  <button>Add Expense</button>
               </form>
            </div>
        );
    }
}

export default ExpenseForm;