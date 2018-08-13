import moment from 'moment';

// Get visible expenses:
// This is imported into ExpenseList
// args are the expenses array of objects from store gotten from props passed in with connect(mapStateToProps) on ExpenseList
// and the filters object destructured as well:
export default (expenses, { text, sortBy, startDate, endDate }) => {
    // filter through expenses array to determine if the expense is included in return
    return expenses.filter((expense) => {
        // transform the createdAt stamp to a moment result to use in the filtering process with builtin moment method
        // isSameOrBefore/After
        const createdAtMoment = moment(expense.createdAt);
        //check if there is start/end date in case they've been cleared on ExpenseListFilters in the cal on ExpenseDashboard.
        // if no start date then don't filter based on it, so return true to pass .filter() test.
        // Check to see if the date entered is the same or before/after the createdAt date to determine whether to 
        // display and include the expense in the list
        // use builtin moment method to compare if the startDate selected is the same day (2nd arg) or before the createdAt moment
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const description = expense.description;
        const lowercaseDescription = description.toLowerCase();
        const lowercaseText = text.toLowerCase();       
        const textMatch = lowercaseDescription.includes(lowercaseText);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        // for sort if 1 is returned, b comes before a, if -1 is returned a comes before b (returning 0 leaves order unchanged)
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; 
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1;
        }
    });
};

// Get visible expenses

// export default (expenses, { text, sortBy, startDate, endDate }) => {
//     return expenses.filter((expense) => {
//       const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
//       const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
//       const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
  
//       return startDateMatch && endDateMatch && textMatch;
//     }).sort((a, b) => {
//       if (sortBy === 'date') {
//         return a.createdAt < b.createdAt ? 1 : -1;
//       } else if (sortBy === 'amount') {
//         return a.amount < b.amount ? 1 : -1;
//       }
//     });
//   };