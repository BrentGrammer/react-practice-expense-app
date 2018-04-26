import React from 'react';
import { Link } from 'react-router-dom'; 
import moment from 'moment';
import numeral from 'numeral';

// Parent is ExpenseList (whose Parent is ExpenseDashBoardPage) -user clicks on expense in dashboard page

// the props are passed in from ExpenseList as the expense object, and then it is destructured to pull data into 
// variables:
 const ExpenseListItem =  ({ id, description, amount, createdAt }) => (
        /* goes to edit expense page passing in the id (from expense list selector) for each expense list item to the 
            dynamic url param */
        <Link className="list-item" to={`/edit/${id}`}>
           <div>
              <h3 className="list-item__title">{description}</h3>
              <span className="list-item__sub-title">{/* Format the date with moment passing in, see https://momentjs.com/docs/#/displaying/ for reference  */} 
                  {moment(createdAt).format('MMMM Do, YYYY')}
               </span>
           </div>
           <h3 className="list-item__data">{/* using numeral.js library to format int cents.  divide the cents by 100 to get the right price */}
              {numeral(amount / 100).format('$0,0.00')}
           </h3>
        </Link> 
);

export default ExpenseListItem;

//

// import React from 'react';
// import { Link } from 'react-router-dom';

// const ExpenseListItem = ({ id, description, amount, createdAt }) => (
//   <div>
//     <Link to={`/edit/${id}`}>
//       <h3>{description}</h3>
//     </Link>
//     <p>{amount} - {createdAt}</p>
//   </div>
// );

// export default ExpenseListItem;