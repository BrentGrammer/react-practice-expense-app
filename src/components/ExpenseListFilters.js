import React from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

// these inputs dispatch filter actions to the filters reducer which sets them on the store state
// This is called and rendered on ExpenseDashboard parent which allows the user to set the filters in store state object
class ExpenseListFilters extends React.Component {
    state = {
        // this value will be null or a string (string if focused on the first or second of the 2 calendars)
        // this just needs to be tracked and passed into the react-dates component below
        calendarFocused: null
    };
    // this method is called by the react-dates library and takes in an object with a start date and an end date

    // When user selects different dates in cal, this grabs selections, and dispatches action to set filters in the 
    // redux store
    // How is this getting the start and end date passed in - from where?
    onDatesChange = ({  startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    render() {
        return (
            <div className="content-container">
            {/* Create wrapper div for list and for each menu item */}
               <div className="input-group">
                  <div className="input-group__item">
                    <input 
                        type="text"
                        className="text-input" 
                        placeholder="Search Expenses"
                        value={this.props.filters.text} 
                        onChange={(e) => {
                            this.props.dispatch(setTextFilter(e.target.value));
                        }} 
                    />
                  </div>
                  <div className="input-group__item"> 
                    <select 
                        className="select"
                        value={this.props.filters.sortBy}
                        onChange={(e) => {
                            e.target.value === "date" && this.props.dispatch(sortByDate());
                            e.target.value === "amount" && this.props.dispatch(sortByAmount());
                        }}
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select></div>
                  <div className="input-group__item">
                    <DateRangePicker 
                        // accessing the prop set in src\reducers\filters.js through the connect() setup
                        startDate={this.props.filters.startDate} 
                        startDateId="start" 
                        endDate={this.props.filters.endDate} 
                        endDateId="end"
                        onDatesChange={this.onDatesChange} 
                        // grabs tracked value from the local component state
                        focusedInput={this.state.calendarFocused} 
                        onFocusChange={this.onFocusChange}
                        showClearDates={true} 
                        // limits the popup cal to one month
                        numberOfMonths={1}
                        // allows for picking dates in the past
                        isOutsideRange={() => false}
                    />
                  </div>
               </div>
            </div>
        );
    }
};
// gets filters object from the redux store and sets it to props in the connected component
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);