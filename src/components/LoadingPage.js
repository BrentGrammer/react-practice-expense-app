import React from 'react';

// Loading spinner gif page loaded in app.js in ReactDOM.render() on first visiting app page

const LoadingPage = () => (
    <div className="loader">
    {/* This loads the spinner image from public/img/loader.gif and will show a spinning loading icon on app.js when page is visited */}
       <img className="loader__img" src="/img/loader.gif" />
    </div>
);

export default LoadingPage;