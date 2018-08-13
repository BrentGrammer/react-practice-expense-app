import React from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

// these inputs dispatch filter actions to the filters reducer which sets them on the store state, which then this component
// gets them from the store state and puts them in it's props (through connect(mapStateToProps))
// This is called and rendered on ExpenseDashboard parent which allows the user to set the filters in store state object
export class ExpenseListFilters extends React.Component {
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
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        e.target.value === "date" && this.props.sortByDate();
        e.target.value === "amount" && this.props.sortByAmount();
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
                        onChange={this.onTextChange}
                    />
                  </div>
                  <div className="input-group__item">
                    <select
                        className="select"
                        value={this.props.filters.sortBy}
                        onChange={this.onSortChange}
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
                        // grabs tracked value from the local component state (can be 'startDate', 'endDate', or null)
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
// gets filters object from the redux store state and sets it to props in the connected component
const mapStateToProps = (state) => ({
        filters: state.filters
    });

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => { dispatch(setTextFilter(text)); },
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
