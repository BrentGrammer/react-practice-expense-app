import React from 'react'; 
import { Link } from 'react-router-dom';

const NotFoundPage = (props) => (
    <div>
        404! - <Link to="/">Go back to home page</Link>
    </div>
 );

 export default NotFoundPage;