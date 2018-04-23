import numeral from 'numeral';
// selectExpensesTotal should be the default export name to import in files that need this selector function
// This selector is imported and used in the ExpensesSummary Component which is called in the ExpensesDashboard parent

// This selector func takes in expenses array of objects from the expenses pulled from store
// and adds them all up with reduce to get a total of selected expenses:
export default (expenses) => {
    // check if there are any expenses and if not return 0 for the total:
    if (expenses.length === 0) {
        return 0;
    } else {
    // loop through expenses array of objects to pull the amounts into an array of numbers with map() and then use reduce()
    // to add up all the amounts in the array to a total sum:
    return expenses
       .map((expense) => expense.amount)
       .reduce((acc, amount) => acc + amount, 0);      
    }
};

