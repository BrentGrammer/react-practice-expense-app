// import built-in path module from node for use with defining paths in code:
const path = require('path');
// import express using node import syntax with require:
const express = require('express');
// create a new instance of express to use and load in the app:
const app = express();
// create const for public folder path for use in code:
// (use path module and remember to pass in each part of the path to join to the root)
// remember to just use the parts of the path and do not include the '/'
const publicPath = path.join(__dirname, '..', 'public');
// create a variable for the heroku dynamic provided port num to listen on inside process.env.PORT (Heroku assigns it here):
// the value will be assigned if heroku provides it, but if in development and it doesn't exist, use 3000 with the logical || operator:
const port = process.env.PORT || 3000;

// serve the public folder and everything inside it with middleware (runs when request is made)
// express.static takes the path to the public folder when a static file is requested (a file.css file.js file.html etc.) directly in the url.  
// When express sees a static file requested it will look for the file name in the directory passed into express.static():
app.use(express.static(publicPath));

// sets up a function to run when a get request is made to server.
/* this is used to enable client side routing so that react-router will serve index.html with the routes setup
   when 404 is returned (because the folders for the routes don't actually exist inside the \public dir) */
app.get('*', (req, res) => {
    // send back the index.html file with res.sendFile() method, passing in the file path as the arg:
    res.sendFile(path.join(publicPath, 'index.html' ));
});

// start the server and set a port to listen on (3000 is safe for dev env or use the heroku provided port if it exists
// if in prod env) and provide a callback when server is started:
app.listen(port, () => {
   console.log('server started!');
});
