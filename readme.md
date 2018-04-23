# From Andrew Mead's Udemy Course: [The Complete React Web Developer Course (with Redux)](https://www.udemy.com/react-2nd-edition/learn/v4/overview)

(the markdown file did not like my text notes - I need to fix this at some point...)

NOTE: This project is a practice app which I built following the udemy course above.  It was meant to help me learn React and the code is very messy with comments, etc. which are notes I added during the course and which I can use as a reference in the future.  

If you're learning React, you may find the comments helpful.

NOTES:

TO GET DEV SERVER TO WORK, YOU MAY NEED TO MOVE PROJECT FILES TO DESKTOP OR DIFFERENT FOLDER THAT IS NOT NESTED!

-When installing packages with NPM, make sure to add --save or --save-dev flags to update the package.json so you can 
run npm install to get all dependencies installed in future.  
Also use npm init to make the package.json at first.

=========================

STRUCTURE OF REACT APP:

-/src/app.js is a central file (called 'entry point') that imports separate javascript files (components, etc).  
It serves as a base or map for the application files that points to the various parts of the app. 

-src/styles/styles.scss serves the same purpose as app.js except for css files.  It uses SCSS to import separated
css files and code to keep things organized.

Entry Point: a central file that imports separate javascript files 
(components, etc).  It serves as a base or map for the application 
files that points to the various parts of the app.  (i.e. src\app.js)

Partial: separate files that are loaded and imported into the entry 
point file.  (they are labeled with an underscore: i.e. _file.scss, 
etc..)  These files contain part of the application (they are components)

=============

NOTE: Bad practice to install dependencies and packages globally.
-Install them locally and then create a script in package.json to run them in the terminal

-**TO USE BOTH LIVE SERVER AND BABEL TOGETHER:

1) Run Live server command in one terminal: $ live-server --browser=CHROME public
2) Open a new terminal with '+' in the top terminal nav and then run Babel watch command
$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

--save and --save-dev flags used in terminal 

--save needed for the app in production env
--sav-dev just needed for dev environment and app does not need it to run after compiled.

--------------------

BABEL:

Starting and stopping Babel compiler: 
$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

// babel now runs in the background and will update public/scripts/app.js whenever a change is saved in src/app.js

-Stopping Babel: in terminal use CTRL-C 

-NOTE: You can keep pressing the up arrow to go through previous commands so you don't have to type one made earlier


----

Starting Live Server:
$ live-server --browser=CHROME public

==========================

JSX:

<User /> = Uppercase starting tag will render an in-scope variable (i.e. a const User function or User component class)

<h1> = lowercase tag will render HTML element

Supports/accepts:
-Strings
-Numbers
-Arrays (can only contain JSX(typical), or strings/nums/arrays - booleans/null/undefined ignored - Objects not accepted. If containing JSX, each item needs a unique key attribute)
-JSX ( JSX inside JSX i.e. { {<h1>This is JSX</h1} } )

IGNORES (can still be used with no error, nothing rendered):
-Booleans, NULL, undefined

DOES NOT ACCEPT (error):
-Objects

-When calling functions in JSX, do not end with ; delimiter


-The html and data stored in JSX syntax in a variable (i.e. template) is saved as an object.

-Consecutive elements must be wrapped in a wrapper element (i.e. like a <div>) for valid JSX and Babel compiling.

-UNDEFINED, BOOLEANS (true and false) and NULL are ignored by JSX (expressions evaluating to them will not be rendered)

-Only expressions go inside the {} curly braces (i.e. not objects or conditionals or any line of code that doesn't directly evaluate on it's own).

-Arrays are supported by default in JSX

-A function is an expression that can contain logic (like conditionals). You can pass in the function to the {}.
-So to use an if statement, for example, you put it in a function separately, and call the function in the {} ( ex: {func()} ).
-Note: conditionals using ternary operator are expressions and do not need to be used separately in a function with JSX.

-You can include HTML markup (tags etc) inside JSX expressions and they will be evaluated to HTML markup and rendered (useful for using in logic to hide/display): 
Ex: {<h1>Title</h1>} // you don't need quotes around innerhtml text as they are being evaluated as HTML and not strings!

Note: if html markup is inside {} you write it just as if you were writing it outside of {} unless you are using a variable expression - this needs 
to be wrapped in {} as a nested JSX expression. Ex: {<h1>{var}</h1>}

-*If the expression in JSX evaluates to undefined, it will not be rendered or exist in the DOM ( {undefined} or a function that returns undefined)

-Referencing a function in JSX: if you call it (i.e. {funcName()}), you will get the return value (which could be undefined).
generally you just reference the function name without calling it in the JSX syntax (i.e. {funcName}) - the function is called and runs.

-returning html markup in the function logic does not need to be in quotes as a string - it is evaluated as part of the function expression

----------

CONDITIONALS:

-Ternary operators and logical && operator in JSX expressions:

-Logical && operator use: when you want to render one thing or nothing. If first condition is true, the second parameter
to the right of the && is returned, if the first condition is not true, false is returned.

Ternary operator use: when you want to do/render one of two different things 

TIP: when using ternary operators, keep the html tags outside of the {} (they always exists, you're just returning one of two possible things to render in them).
     
     Ex: <h1>{user.name ? user.name : 'Anonymous'}</h1>

     when using logical && operators, the tags will be inside the {} since the element may not be displayed if the 
     condition is not true (false is returned). 

     ex: {user.name && <h1>user.name</h1>}  

-Assigning Attributes in JSX: (certain attribute names are changed - i.e. class is className)
-you can find a list of attribute names to use in React towards the bottom of this page: https://reactjs.org/docs/dom-elements.html
Note: you do not need to include the quotes when assigning an expression to an attribute (that returns a string)

------------

Example using map() in JSX to loop through an array of options to display on screen:

-KEY POINTS: 
The entire map method for the array goes inside curly braces {}, and.. 
when referencing a variable to render in the HTML markup make sure it is inside curly braces as well {}

class Options extends React.Component {
    render() {
        return (
           <div>
              {
                  this.props.options.map( (option) => <p key={option}>{option}</p>)
              }
           </div>
        );
    }
}


----

Example using an instance of a sub component and passing data accessed from parent component to it:

(options is defined as a const in the App Parent Component that calls an instance of <Options />)

class Options extends React.Component {
    render() {
        return (
           <div>
              {
                  this.props.options.map( (option) => <Option key={option} optionText={option} />)
              }
           </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
               {this.props.optionText}
            </div>
        );
    }
}


========================

NO DATA BINDING IN JSX:

-There is no data-binding in JSX (evaluated variables are static, and if their value changes, they must be re-rendered with ReactDOM.render())

-Call your custom render function immediately in the app, then in functions that update rendered data, call it in the function body.

-YOU NEED TWO THINGS IN CUSTOM RENDER FUNCTION:
1) The JSX Template to render
2) The ReactDOM.render() call with the template and location passed in.

-------

EVENTS:  

-Click event can be registered and handled with onClick={funcName} as an attribute of JSX element. 

***You don't want to call a handler inline (this will fire it with every render), instead just reference the handler
so that it will only be called when the event occurs!

ex: this is correct: <button onClick={eventHander}> and NOT: <button onClick={eventHandler()}> !!!

-Remember to reference 'this' with the event handler method if referencing an event handler inline in the JSX of a component or object:
Ex: <button onClick={this.eventHander}> and NOT: <button onClick={eventHandler}>

------

BINDING 'THIS':

-Note on losing 'this' value with handlers and methods that have a change of context:

*****USING BIND() IS EXPENSIVE WHEN USED IN RE-RENDERING NUMEROUS TIMES!***

-A better solution is to override the constructor function for the builtin React Component class and bind the event handlers to 'this' in the 

constructor (so that 'this' always refers to the parent component object when calling the handler)!!

1) create a constructor function in the component class and pass in props as an argument (props refers to the same thing as this.props elsewhere in 

the class and is passed in with the builtin React Component contructor)

2) Call super(props) with props passed in to call the React Component class constructor

3) Set the event handler to itself, but bind it to 'this' using .bind(this)

Ex: 

class MyComponent extends React.Component {

    constructor(props) {
        super(props);

        this.eventHandler = this.eventHandler.bind(this);

    }

}

// Now wherever the eventhandler method is called it will not lose it's 'this' context pointing to the parent component
(i.e. if needing to access this.props.[value] so that 'this' will point to the parent component to access the passed in props)

================================

FORMS: 

-List of events available in React (Supported Events section of page in Form Events): https://reactjs.org/docs/events.html

** Pass in the event (e) to the submit handler function to reference the e.target.elements, etc.! 

-use e.target.elements.[element name attribute value].value to get the value of the input etc.

Validation:

-use .trim() to eliminate spaces

Ex of handling submitted form data:

    handleAddOption(e) {
        
        e.preventDefault()
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
      
        if(!error) {
            e.target.elements.option.value = '';
        }
    }

    -----------

    SUBMITTING FORMS:

-Use onSubmit prop on the form tag, which takes a function that is defined on the class component.

-onSubmit is set equal to a function (or a reference to a function), and it's argument is an object which includes
all of the submitted form data (which can be set to the local component state by the onChange handlers on the form
elements which update local state with user input)

-in the onSubmit prop, reference a handler function that fires when the form is submitted
Ex: <form onSubmit={this.onSubmit}>
-in the handler pass in the event as (e) and use e.preventDefault() to prevent the page from refreshing and handling the submission
with javascript.
-add a conditional if statement to check if required fields are not empty by checking the this.state property that is 
updated by the form input when user enters data. if fields are empty, then set assign an error message to an error prop on the 
state that can be rendered in the form conditionally (use the logical && operator). 
Ex: 
if (!this.state.[state prop that input prop updates-usually the value] || !this.state.[state prop that input updates]) {
       this.setState(() => ({ error: 'put error msg here' }));     
        } else {
            // clear the error and submit the form:
            this.setState(() => ({ error: '' }));
        }


*** You want to pass the submitted data up so that you can use the form component anywhere (using dispatch
may involve sending out different data, so you don't want to call dispatch in the form component)

On the parent component that calls an instance of <[FormNameComponent] /> pass in a prop onSubmit which takes a anonymous 
function that accepts an argument which is an object containing properties with all of the data submitted on a successful valid 
form submission.

On the form component that onSubmit is passed to, access this.props.onSubmit and call it passing in the form input values
that were set on the state object by the bound inputs that update the state whenever a user enters data on the form.

1) user enters data on the form which has a listener prop (i.e. onChange or onClick) that listens for input or change to
the value of each input field, and then updates the LOCAL state of the form component using this.setState setting the 
corr. local state property to the e.target.value (setState rerenders the form component with the new state value 
instantly)

2) When form is submitted, the onSubmit method is called which access props.onSubmit passed in by the parent component 
using the form component as a child instance, and passed in an object containing the form entered data pulled from the 
local state.  

3) Connect the parent component containing the form instance as a child component to the redux store by using connect() 
so that you can dispatch an action with the form data with props.dispatch([action generator([returned object from form component])]) to update the store from it.
(remember to import it as a named export from 'react-redux' and also the action generator to use with dispatch from the actions
folder.) 

4) To redirect after form submission use special builtin props that components that are rendered inside of React Router
get access to.  use the props.history.push() method which takes an string argument which is the relative path of page to 
redirect to, to progammatically change pages and redirect. call it after the dispatch
in the form instance component.

Ex:

import React from 'react'; 
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
       <h1>Add Expense</h1>
       {/* on valid form submission this argument contains an object of all form inputs submitted passed in 
           to the onSubmit method handler on the ExpenseForm.js child component */}
       <ExpenseForm onSubmit={(expense) => {
            props.dispatch(addExpense(expense));
            // use builtin prop methods given from React Router to components rendered in AppRouter:
            // argument is a string representing the relative path to the page to redirect to.
            props.history.push('/');
       }}/>
    </div>
);

export default connect()(AddExpensePage);

============

COMPONENTS:

2 kinds: 

1) Stateful Class Components (have state and can update), 
2) Stateless Functional Components (are functions and 
do not have state - only return JSX to render and that's all they can do - they load faster and are cheaper - use them
when the component is simple and doesn't need to change state)

**A component can change it's own state ( by defining this.state, and then using this.setState() ), but not it's own props (they are passed in from it's parent component)

***When possible, use Stateless Functional Components (for simple components that don't require dynamic states) - 
less overhead, less expensive and faster.

CREATE A COMPONENT:

1) create class name with capital letter that extends React.Component class
2) Define the render() method in the class which returns JSX to render
3) Insert the Component into the app template as a self closing tag with capital letter (ex: <Component />) 
   
   class ComponentName extends React.Component {
       render() {
           return [JSX goes here];
       }
   }

   const template = (
       <div>
          <ComponentName />
       </div>
   );

   ReactDOM.render(template, 'app');

   ===============

STATELESS FUNCTIONAL COMPONENTS:

-Components that are functions (similar to render() inside a component class)

-These components are called by using the same syntax to instantiate a class Component: <ComponentName />

-Cannot use state, but can use props -- can be passed in the call: <ComponentName prop1="prop1" />, also passed into 
the function argument as (props)

-Access them in the function component with props.[propName], i.e. {props.prop1} from above ex. (i.e. do not use this.props)

-- Creating a Stateless Function Component: --

Syntax: Use ES6 implicit return (no {} needed or return keyword, just the JSX in parens)

const User = (props) => 
    (
        <div>
          <p>Name: {props.name} </p>
          <p>Age: </p>
        </div>
    );


// To render, call like a component class with cap letter and in self closing tag:
ReactDOM.render(<User name="Brent" />, document.getElementById('app'));

===================================

COMPONENT PROPS:

NOTE: 
*Props should only be used when passing from one parent to one child directly.  Avoid using props when you need to
pass them down through a long chain of components. In that case, use Redux.

-Props are data passed into the class instance as custom attributes, 
and accessed in the class instance by using this.props.[attributeName]

-ONE WAY DATA FLOW: 
Props can only be updated by Parent components, and they can only be passed down to child components from PARENTS
*A child can update props on a parent if the parent passes a function down to the child in props that allows the
Child Component to do this.

-Props cannot be changed by the component itself.

Ex:

STEP 1: Assign passed in custom data props to the component instance (or Define a const to reference in the Parent Component
and reference it when passing in data to the child component prop), which can be referenced in the component 
class blueprint:

class IndecisionApp extends React.Component {
    render() {
        return (
           <div>
             <Header title="App Name" />
           </div>
        );
    }
}

STEP 2: Access the custom prop data using this.props.[propName] in the component class blueprint JSX:

class Header extends React.Component{
    render() {
        return (
            <div>
               <h1>{this.props.title}</h1>
            </div>
        );
    }
}

----

Passing Variable into Component Props: Note: place the variable definition inside the render method!

class AppParentComponent extends React.Component {
    render() {
        const title = "App Name";
        return (
           <div>
             <Header title={title} />
           </div>
        );
    }
}

=============

----------------

PASSING PROPS FROM CHILD COMPONENTS TO PARENTS:

-By default, props are one way data flow - only parents can pass and update prop data to children components.

-Solution is to pass functions in as props to the child component, so that the child component can call it to send or update data on the parent.

1) Define a method in the parent component to pass down as a prop that accesses this.setState() to use for updating the state of the parent in the
child component -- return the state object with only the necessary key/value changes:

// use fat arrow implicit return syntax:
this.setState(() => ({ [key]: [newValue] }));

2) Bind 'this' - bind the method in the constructor so that 'this' in the method points to the parent component being updated. ( use this.
[methodName] = this.[methodName].bind(this); )

3) pass in the function as a prop into the child Component instance (called inside the parent component, i.e. <Child prop={this.[methodName]} />)

4) Access the passed in method on the child component with {this.props.[methodName]}

-------------------------

DEFAULT PROPS:

-use [ComponentName].defaultProps = { [defaultProp]: [defaultValue], etc. }

Ex:

const Header = (props) => {
    return (
        <div>
           <h1>{props.title}</h1>
           {/* check if subtitle exists using logical && conditional: */}
           {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

//Add a default prop title value which can be overridden by other pages if passed in:
Header.defaultProps = {
    title: 'Indecision'
};

-or set up default props for app:

AppComponent extends React.Component {
  	this.state = {
            options: props.options
        };
}

AppComponent.defaultProps = {
    option: []
};

ReactDOM.render(<AppComponent options={['One','Two']} />, document.getElementById('app'));

----------------------

PROPS.CHILDREN

-JSX in between opening and closing component instance tags will be stored in props.children and can be accessed
 and inserted where desired with {props.children} on stateless func comps, or {this.props.children} on class comps:

Ex:

const Layout = (props) => {
    return (
        <div>
            {props.children} //<p> JSX passed in below will render here
            <p>header</p>
            <p>footer</p>
        </div>
    );
};

ReactDOM.render(<Layout><p>this is children prop test</p></Layout>, document.getElementById('app'));
   
==================================================
----------------------------------------
LIFECYCLE METHODS

componentDidMount()
-When the component renders or re-renders, use this to fetch data from the store or database, and then update the state
object with the fetched data with this.setState()

componentDidUpdate(prevProps, prevState) (has access to these two argument objects - if using either, pass both in)
-When the component updates or data/props/state is modified, use this to store the updated data in the store or database 

===============================================================

DEBUGGIN TROUBLESHOOTING TIPS:

https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375

-Make sure you don't have two copies of react installed (caused by packages that have a dependency on REACT that 
make an additional different copy of REACT install, for example)
-Assuming you have source maps (or Webpack’s devtool: ‘eval’) enabled, open Sources tab in Chrome DevTools. Press
 Cmd+O (Ctrl+O on Windows) and type “React.js” and look for two copies of React.js listed.

-IF 'THIS' IS LOST: use .bind() and pass in the parent object you want 'this' to reference:

Ex:

const methodRef = obj.methodName.bind(obj);


==============================

SETTING UP REACT WITH WEBPACK:

1) uninstall global dependencies in terminal with npm uninstall -g [dependency]

2) Install dependencies locally (Babel and Live-server for ex)
$ npm install live-server babel-cli@6.24.1

NOTE: you may need to install presets for babel individually if you get not found error when running script:
$ npm install babel-preset-env
$ npm install babel-preset-react

3) Add scripts for the dependencies into package.json file under the root (first) object:
-create a name for the script and define the script/command in the value:

"scripts": {
    "serve": "live-server --browser=CHROME public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },


4) Run the script in the terminal with npm run [scriptname]:
 Ex: 
 $ npm run serve
 $ npm run build

 5) install webpack with $ npm install webpack

 6) Set up webpack.config.js file in root app folder with options:
 // set up the entry point for the app (/src/app.js) and output (where bundle.js goes)

// require the node module (to enable use of node method path.join()) to help with concatenating absolute output file path
const path = require('path'); 

//setup a property on module (object that contains all config details for webpack):
// webpack will take module object and expose it to other files
module.exports = {
    entry: './src/app.js',
    output: {
        //absolute path of where to output (use path.join node method with __dirname to get public absolute path)
        path: path.join(__dirname, 'public'),
        // name of file to output (can be custom)
        filename: 'bundle.js'
    }
}

7) run webpack script cmd defined in package.json to make the bundle.js file in public folder:
$ npm run build

8) remove other script src tags in public/index.html and just use the one <script src="/bundle.js"></script>

***NOTE: DO NOT USE './' in the src attribute (i.e. src="./bundle.js") -- The paths must be relative to the server root 
(i.e. /public/) and you need to use just the single '/' to indicate the path: <script src="/bundle.js"></script>

================

IMPORT/EXPORT 

Named:
-On exporting file: export { [name(s) of variable/data ] };
-On importing file: import { [name(s) of exported data] } from '[./exportingRelativeFilePath]';

Default:
-on exporting file: Use the key word 'as default' after the exported data
-***You can only have ONE default export!!!
Ex:
export { x, y, z as default }; 
-on the importing file: reference the exported default OUTSIDE of the {} curly braces if using named exports:
Ex:
import z, { x, y } from './utils.js';
or
import z from './utils.js'; // if only using the default

NOTE: default exports will always not be in {} while named exports are inside curly braces {}

Alternative default export syntax:

export default [value/data];
Note: do not use with stateless functional components or you lose the name in HTML markup - place it underneath stateles
functional component code. export default [ComponentName];

===================

IMPORTING 3rd PARTY MODULES (LIBRARIES, FRAMEWORKS ETC.):

1) Install:
-use $ npm install [packageName] (check docs, google npm [package name])

2) Import the module in the file you want to use it in:
-Need to check what modules of the package are available to import (need to check documentation to see how to 
access what you want)
-Ex: import validator from 'validator';
Note: relative path is not necessary here - when importing a module, just use the name as per docs, webpack will 
look for the folder of the same name in the node-modules folder by default.

3) Use the imported module
-check docs for available methods, etc. and use them with [importedName].method(); etc. in the code.

================

INSTALLING REACT WITH NPM LOCALLY:

-You need to npm install both react and react-dom modules!
$ npm i react react-dom

-Start the webpack build again with $ npm run build

-Import the react and react-dom modules (usually just google the package name and import to get an example)
import React from 'react';
import ReactDOM from 'react-dom';

NOTE: You generally only need to import React if you are using JSX in the file.

-------------

SETTING UP WEBPACK TO USE BABEL TO COMPILE JSX:

1) Install local dependencies and the loader:
-Babel Core (allows you to run babel commands through webpack)
-Babel Loader (webpack plugin that tells Webpack how to run babel when it sees files)

$ npm install babel-core babel-loader

2) 2) Set up the loader and define rules property array inside the module obj in webpack.config.js:

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
}

3) Create config file called .babelrc in root directory of project to define presets:
Inside .babelrc file:
{
    "presets": [
        "env", 
        "react"
    ]
}

4) Run a new webpack build in the terminal: $ npm run build

=======================

USING A SOURCEMAP:

-Points you to original line of code instead of the bundle.js line in the console.

In webpack.config.js, add a property devtool to accept a string for the type of source map to use 
(check https://webpack.js.org/configuration/devtool/ for a list)

    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map'
}

--------------

SET UP WEBPACK DEV SERVER:

*Runs Webpack build automatically, so not necessary to $ npm run build separately

1) Stop Webpack if running (CTRL-C)
2) $ npm install webpack-dev-server
3) Set source to public folder in webpack.config.js

module: {      
    devServer: {
        contentBase: path.join(__dirname, 'public') 
    }
}

4) Create "dev-server" script in package.json:

 "scripts": {
    "serve": "live-server --browser=CHROME public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server" 
  }

5) Stop any servers if running, and run $ npm run dev-server
//(this runs a webpack build as well)

==================

Using SASS:

***Use a CSS Reset to ensure that styling shows the same in different browsers:
-Normalize.css is a good library to use 
(https://necolas.github.io/normalize.css/): 
1) install it with npm install
2) import the file into the entry point app.js file (in \src\app.js\) above the styles.scss
Ex: import 'normalize.css/normalize.css';
    import './styles/styles.scss';

    Note: make sure the test in the webpack.config.js file tests for both scss and css by adding a ? after the s:
    test: /\.s?css$/

    ---

-When importing partials, leave off the underscore and the extension and just use filename:

Ex: @import './base/base';  //imports ./base/_base.scss file

BEM (Block Element Modifier) naming convention:
-use parent element with two underscores and the target child/section:
.header__title { 
    //rules for a title inside a header class element, etc.; 
}

----------

VARIABLES IN SASS:

-Store inside \styles\base\_settings.scss

-import this file into \styles\styles.css file at the top of the file before all other imports:
@import './base/settings';
@import './base/base';
@import './components/header';
etc...

in _settings.scss create variables:
Ex: $bg-color: #ccc;

reference in another file:
{ background: $bg-color; }

--------------------------------------

MAKING SCSS COMPONENTS:

In \styles\components\ folder:
-create file with underscore - _componentName.scss 

Import it into \styles\styles.scss file referencing the name without the underscore and extension:
@import './components/header';

=========================

MAKE APP MOBILE FRIENDLY:

-Set meta tag in head on index.html:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

-To stack elements on top of each other:
{ flex-direction: column }

-media queries:

1) set the default css rule for mobile screen size in the css
2) create a media query with min-width condition (450px for ex.) that contains the rules for large screen size

Ex:
@media (min-width: 45rem) {
   .class-selector {
      prop: rule;
   }
}

=================

FAVICON in Tab:
in index.html <head> make a <link> to the icon (path is relative to server, i.e. /public **Do not use './' !!):

<link rel="icon" type="image/png" href="/img/favicon.png" />

==================

REACT ROUTER:

docs: https://reacttraining.com/react-router/

REACT ROUTING:
*Allows for creation of a single page app that can simulate page changes by swapping out components based on URL requests.

1) Install with $ npm install react-router-dom

2) In \src\app.js, Import <BrowserRouter> and <Route> from react-router-dom:
ex: import { BrowserRouter, Route } from 'react-router-dom';
-<BrowserRouter> - used once to create the router
-<Route> - used for every single page - takes in the path to match for, and what to do when the user visits that path

3) To use, assign routes const to an instance of <BrowserRouter> with opening and closing tag and pass in <Route> instances 
as children 
<Route> takes two props: path (when to show component when url path hit) and component (what component to show) :

****NOTE: You must put multiple routes inside a single <div> wrapper inside <BrowserRouter>!!
          ****You also must include the exact={true} prop on the "/" route to prevent it matching all other component routes that begin with "/" 
            and displaying the index.html at "/" along with the routes that match "/routeName"

const routes = (
   <BrowserRouter>
      <div>
	    <Route path="/" component={ComponentName} exact={true} />
        <Route path="/about" component={About} />
      </div>
   </BrowserRouter>
);

4) Render routes in ReactDOM.render on src\app.js: ReactDOM.render(routes, document.getElementById('app'));

--

404 NOT FOUND ROUTES:

-use <Switch> built in react router component to handle urls that do not exist on your app:

1) import the builtin Switch component in app.js: import { BrowserRouter, Route, Switch } from 'react-router-dom';

2) Create a 404 stateless component to show what to display when a url to a component that doesn't exist is accessed

3) Place all routes inside a <Switch> wrapper with the 404 component route (leave out a path prop) at the end.

Ex:

const routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
);

----------------------

Including a Header on All Pages:

-put it in a div inside of BrowserRouter, but outside of the Switch wrapper.

Ex:

 const Header = () => (
    <header>
      <h1>Expensify</h1>
    </header>
 );

const routes = (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact=     

          {true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
);


---------------------

CREATING LINKS TO OTHER PAGES IN APP:

-use builtin React Router <Link> component to handle client side serving links.

-import { Link } from 'react-router-dom'; (or { NavLink })

Ex:

<Link to="/">Go back to home page</Link>

----

<NAVLINK> BUILTIN COMPONENT:

-used to create nav links that are bold when selected. (you can target the class from activeClassName prop in the css
and apply font-weight: bold; for example)

Ex:

const Header = () => (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
      <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help Page</NavLink>
    </header>
 );


--------------

SETUP AND IMPORT COMPONENTS TO APPROUTER.JS:

In src\components\[Component].js file:

import React from 'react'; 
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        404! - <Link to="/">Go back to home page</Link>
    </div>
 );

 export default NotFoundPage;

 In src\routers\AppRouter.js:

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage.js';

 const AppRouter = () => (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
          <Route path="/" component={ExpenseDashboardPage} exact={true} />
          <Route path="/create" component={AddExpensePage} />
          <Route path="/edit" component={EditExpensePage} />
          <Route path="/help" component={HelpPage} />
          <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
 );

 export default AppRouter;

===================================================

DYNAMIC URL PARAMETERS WITH REACT ROUTER:

-Use :[param] in the path in the <Route> instance in \src\routers\AppRouter.js (Ex: path="/userspage/:id")

-Make sure that index.html script src points to relative path for bundle.js using '/bundle.js' and NOT './bundle.js'!!
Ex:  <script src="/bundle.js"></script>

-Also make sure to add exact={true} prop to root paths when there is also a route to a nested path with that root, so that 
the nested path won't also match the root and display the wrong component:

Ex:

<Switch>       
   <Route path="/portfolio" component={Portfolio} exact={true} />
   <Route path="/portfolio/:id" component={EditExpensePage} />      
</Switch>

-Access dynamic parameter with builtin React Router props.match in the component passed into <Route />:
Ex:
const EditExpensePage = (props) => (
    <div>
       Editing Expense id: {props.match.params.id}
    </div>
);

// match refers to the matching url path which calls the component to render, which includes the dynamic variable value 
which is stored in the params property of match.

==============================

REDUX:

-Install with npm

-Use createStore() to define default state obj passed in and access action objects that are dispatched with store.dispatch()

GENERAL PROCESS:
1) createStore() sets default state object and handlers for actions that are dispatched with store.dispatch()
2) When actions are dispatched with store.dispatch() createStore() is called automatically with the action object 
passed in and handles the action based on a switch statement which checks the type attribute name.

----------------


ACTIONS: Objects that are used to update the store state. 

-Objects that are dispatched with store.dispatch() and passed to createStore() which handles them and uses their data to
make updates to the store state object.

-type property is required on all action objects.

-dispatch Action objects with type name in all caps, to cause createStore() to run and return a state object with props to
modify the current state.

-set up a switch to check for action.type and handle each dispatch based on the type name to update the store.

Ex in file:

import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
          return {
            count: state.count + 1
          };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default: 
          return state;
    }  
});

store.dispatch({
    type: 'INCREMENT'
});
store.dispatch({
    type: 'DECREMENT'
});
store.dispatch({
    type: 'RESET'
});

TIP: store.dispatch() returns the action object passed in, so you can store that in a variable to access props of an
object added to the store if needed (i.e. to remove it in the future)
Ex:
const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100 }));
----------------

ACTION GENERATORS: Functions that return action objects.

-Action Generator functions return an action object which can be dispatched with store.dispatch, with at least the 
type property set for a reducer function to reference and any additional data passed in needed to handle the action in 
the reducer function.

-Set up an action generator by assigning it to a const variable and passing the const into the store.dispatch() method:
-Action Generators need a type: prop
-You can implicitly return the action object with ES6 arrow function syntax

-the argument is a placeholder for a passed in prop to use with the action (user defined) and a default set if not entered:

Ex:
const incrementCount = ({ incrementBy = 1 } = {}) => ({ 
    type: 'INCREMENT',
    incrementBy
});

const store = createStore((state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
          return {
            count: state.count + action.incrementBy
          };
        default: 
          return state;
    }
});

store.dispatch(incrementCount({ incrementBy: 5 }));

// pass in any optional props to be used in addition to type as an object into the action generator call - then access 
them with passed in placeholder in the const definition if necessary (make sure to set a default).


--------------

SUBSCRIBE AND UNSUNSCRIBE TO LISTEN FOR CHANGES AND RUN A FUNCTION WHEN STATE IS UPDATED:

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});
// listening for changes and running log function every time state updates.
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

unsubscribe();
// stops listening for changes now

----------------

REDUCER FUNCTIONS:

-Reducer Functions specify how to change the state object using the data provided by the Action Objects.

**They return a value (object or array etc.) that is used to update props in the store state object (where the 
reducer function can be referenced to apply the value).

-Reducers only return an object which represents and contains the modifications to be made to the state.

-Reducers take two arguments - (state = [default values], action) - state is like prevState, and action is the action object passed in
by the dispatch.

2 Rules:
1) They must be pure functions (they only work with data that is passed into scope and do not mutate external scope directly)
Their return value is soley dependent on the data that is passed in to them.

2) They never directly mutate the state object or objects that have been passed in (changing their data by accessing out of scope)
-i.e. always use methods that will return a new object or array representing the state instead of directly mutating 
the state object - ex: use concat or array helpers instead of .push() which does not return a new separate array, 
but modifies the array it's being used on.  or use ES6 Spread object and array operators since they return a copy of 
the original.

Ex of reducer function:

// Filters reducer default state defined to be passed in to reducer function:
const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 
    'date', 
    startDate: undefined, 
    endDate: undefined 
};

// filters reducer:
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        // cases based on action name, etc.
        default:
           return state;
    }
};
------------------

COMBINING REDUCERS TO MANAGE A COMPLEX REDUX STORE STATE OBJECT:

1)  import combineReducers as a named export from 'redux': 
Ex: import { createStore, combineReducers } from 'redux';

2) call it as a function passed into the createStore() method

-combineReducers() takes an object as an argument which contains the root key set to the reference of a reducer 
function that manages that part of the state object as the value.

Ex:
 
const store = createStore(
    combineReducers({
        key:      someReducer,
        otherKey: someOtherReducer
    })
);

-------------------------

DISPATCHING AN ACTION TO A REDUCER:

-When an action is dispatched, it is sent to all reducers that are combined with combinedReducers() inside of the 
createStore() method, so that any reducer that has a switch case for it will catch it, handle it and return a value 
to use in the store where that reducer function is referenced.  

-----------------

USING ES6 SPREAD OPERATORS IN REDUCER FUNCTIONS:


-Can use object spread operator to update the state object in a reducer 

function with a passed in object of updates in a dispatched action:

case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };

or to change a single prop in state, return a new object with all of the original state props with object spread operator,
and overwrite the ones you need to:

switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };

            //this returns a copy of the original state object using the ...state spread so you are not mutating the original


------------------

Using .sort() with an array.  

-pass in a compare function to determine which element comes first based on criteria:
NOTE: .sort mutates the array directly and does not create a copy - do not use this directly on state objects, but only on
copies of the state object.

array.sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; 
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1;
        }
    });

returning 1 in the compare function puts b before a 
returning -1 puts a before b
returning 0 does not sort by the criteria

====================================

HIGHER ORDER COMPONENTS (HOC): A React Component (Higher Order Component) that renders another Component.

-Create a function that takes in a component(s) (as WrapperComponent) which generates a HOC 
-In the function, return a new modified component (this is a HOC) that calls an instance of the passed in component
-Use the {...props} object spread operator to pass in props to the instanced passed in component
-Assign a call of the function to a const with component(s) passed in to hold the instance of the returned HOC.
-To use the HOC call an instance of it by referencing the const name.
-NOTE: The new HOC component has access to the Redux Store.

Ex:

const Info = (props) => (
    <div>
        <h1>Ingo</h1>
        <p>info is {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        // return what you want to have render:
        <div>
            {props.isAdmin && <p>This is the admin warning</p>}
            <WrappedComponent {...props} />
        </div>
    );
};
const AdminInfo = withAdminWarning(Info);

// can pass in props to use to display or hide content by accessing the prop and testing for boolean with conditional
ReactDOM.render(<AdminInfo isAdmin={true} info="information" />, document.getElementById('app'));

======================================

USING REDUX WITH REACT:

SETUP:

folders to hold separate files for:
src/actions -- holds Action Generator functions in files related to associated reducer, export each as named exports
src/store -- holds storeConfiguration.js file to set up the store, export as default, place inside anon. function and return store
src/selectors -- holds functions to query the store, export as default
src/reducers -- holds reducer functions, place in separate files and export as default (import them in /src/store/storeConfiguration.js)

To use redux, 
-import the necessary actions as named exports from ./actions/[filename] into file they're being used in; 
-import the necessary selectors to query store as default exports from './selectors/[filename]';

NOTE: The reducers are already imported and included in the \src\store\configureStore.js file which is imported into 
app.js (if configureStore is imported, then you have access to the reducer functions included with it)

----------

USING REACT-REDUX LIBRARY:

-Install with npm
-import 2 parts as named exports: 
(Provider component which allows all components in app to access the store - used once in root file)
import { Provider } from 'react-redux';
(connect function which components use to connect to the store - this is imported on all component files that access store)
import { connect } from 'react-redux';


---

1) Set up Provider to provide the store to components one time in the root app file:

Setting up <Provider> in \src\app.js:

-import it: import { Provider } from 'react-redux';
-use opening and closing Provider tags to hold component(s) to render app, pass in prop store={reference to redux store} 
and call in ReactDOM.render():

Ex:

const jsx = (
    <Provider store={store}>
       <AppRouter />
    </Provider>   
);

ReactDOM.render(jsx, document.getElementById('app'));

---

2) CONNECTING COMPONENTS TO THE REDUX STORE:

****NOTE: When the component is connected to store with connect() it will automatically update and re-render whenever 
the store is updated or changes!!!

a) import { connect } from 'react-redux';
b) use connect(mapStateToProps)([ComponentName]); with the component
c) export as default

Ex:

import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.filters.text}
        {props.expenses.length}
    </div>
);

// This defines what the component has access to in the store and passes the key/values as props to the component.
// (props on the component connected will = the state object with the key/values specified here).
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};

// connect() returns the function to use to make the HOC, so pass in the comp to the second call which would be calling
// the returned function.
export default connect(mapStateToProps)(ExpenseList);

================

DISPATCHING TO STORE DIRECTLY FROM COMPONENT:

-Use connect() when a component needs to use dispatch() (as props.dispatch once connected)

-To update or pull from store based on user input and actions on page

Process to set up:

1) import connect from react redux: 
import { connect } from 'react-redux';

2) import the necessary action generator from \src\actions folder (or wherever they are) as named export

3) set up a user interactive element in the component (i.e. a input or button element)

4) set up a handler prop on the interactive element (i.e. onChange, or onClick, etc.) which is set equal to a anonymous 
function. Usually, pass in (e) to the anon. handler function, and put the entire anon function inside JSX {} curly braces.

5) in the handler anonymous function body, use:props.dispatch([actiongenerator goes here()]) to send an action to the 
store using the interactive elements value or event (access it by passing in (e) to the action generator inside the 
props.dispatch() argument (i.e. e.target.value for instance, for the text input entered by user).  

6) Connect the component to the redux store to get access to props.dispatch() using export default 
connect()([componentName]); at end of file.

NOTE: the props.dispatch method is part of the props passed in to the connected component in addition to the mapToState 
properties defined.  dispatch() lives on props with the rest of this.  
-So, if you are using destructuring to access props in the stateless functional component argument, you can reference 
with dispatch and just call dispatch (without props.dispatch) in the component.

Ex:

import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

 const ExpenseListItem =  ({ dispatch, id, description, amount, 

createdAt }) => (
    <div>
        {description}
        {amount}
        {createdAt}
        <button onClick={() => {
            dispatch(removeExpense({ id }));
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state) => { 
    return {
        id: 1,
	description: 'description',
	amount: 4;,
	createdAt: 'today'
    };
}; 

==================================================

DROPDOWN SELECT OPTIONS MENU EXAMPLE:

import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input 
            type="text" 
            value={props.filters.text} 
            onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
            }} 
        />
        <select 
            value={props.filters.sortBy}
            onChange={(e) => {
                e.target.value === "date" && props.dispatch(sortByDate());
                e.target.value === "amount" && props.dispatch(sortByAmount());
            }}
        >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);


======================================
CALENDAR AND DATE PICKER/FORMAT TOOL:

-can use a range picker or a single date picker etc.

To Use React-dates with moment.js: 
-First, install moment.js and React-dates with npm:
$ npm install moment --save 
$ npm install --save react-dates

NOTE ON CSS FOR REACT DATES: You need to add border-box to all your styles in react-dates v15+:
Ex in src\styles\base\_base.scss:
*, *:before, *:after {
  box-sizing: border-box;
}
In their docs: "Note: This component assumes box-sizing: border-box is set globally in your page's CSS."

Import dependencies:
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'; 

-Create an instance of the component in the form with required props (this is a dummy example):
Ex: 
<SingleDatePicker 
    date={this.state.createdAt} 
    onDateChange={date => this.setState({ date })} 
    focused={this.state.focused} 
    onFocusChange={({ focused }) => this.setState({ focused })} 
/>

USEFUL OPTIONAL PROPS FOR DATE RANGE PICKERS:

numberOfMonths={1} // limits number of months to show on popup
isOutsideRange={() => false} // allows for selection of past dates
showClearDates={true}  // shows a button to clear the selected dates

----

USEFUL METHODS FOR MOMENT JS:

-Use queries to compare dates to check if before or after (https://momentjs.com/docs/#/query/)
Ex: moment('2010-10-20').isSameOrAfter('2010-10-19');
    moment('2010-10-20').isSameOrBefore('2009-12-31', 'year');
--moment().startOf() moment('month').endOf('month') -- this will set the value to the start or end of the time period
 passed in.


 =================================

 SETTING UP PRODUCTION ENVIRONMENT:

 DOCS: https://webpack.js.org/guides/production/

-The goal is to get as much as possible out of bundle.js file into other files that can be optionally loaded.
- The webpack -p flag minimizes javascript bundle and sets production environment variable for third party libraries
- the webpack --env production flag allows the customization of the webpack.config.js file to export the object in a function that returns it so that the env is accessible in the arg to use it so you can set 
the source map depending on it's value (if it's production or not).

-Modify webpack.config.js:

const path = require('path');

module.exports = (env) => {
  console.log(env);

  const isProduction = env === 'production';

   return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      open: true,
      historyApiFallback: true // required for use with React-Router
    }
  };
};

Modify package.json scripts:

"scripts": {
    "build:dev": "webpack",
    "build:prod": "webpack -p --env production" 
  },

--Separate CSS from Bundle.js file into a separate file so that the styles don't have to wait for the JS to load and 
link to that file in the index.html:




=====================================

LIBRARIES USED:

-React-Router
-NPM UUID - generates unique ids, install with npm, import uuid from 'uuid'; to use: just call uuid()
-redux
-React Redux Library (https://github.com/reactjs/react-redux)
-Moment.js -- popular standard library for formatting date and time easily in the app.
-React-dates: airbnb open source project for calendar date picker - http://airbnb.io/react-dates

--------

PLUGINS:
-babel object rest spread transform (https://babeljs.io/docs/plugins/transform-object-rest-spread/)
(to use object spread operators) -install with npm and add to .babelrc file in plugins array.

-Babel transform-class-properties: allows for simplified syntax in class methods and class construction.
https://babeljs.io/docs/plugins/transform-class-properties
$ npm install --save-dev babel-plugin-transform-class-properties
-then configure it in .babelrc file: use the "plugins" property that holds an array of plugins (leave off the prefix in the plugin name).
Ex:
{
    "presets": [
        "env", 
        "react"
    ],
    "plugins": [
        "transform-class-properties"
    ]
}
-Now, start up dev server again with $ npm run dev-server

---

-Webpack Plugin for production to extract css from bundle.js: 
mini-css-extract-plugin : https://github.com/webpack-contrib/mini-css-extract-plugin

see install post here: https://www.udemy.com/react-2nd-edition/learn/v4/questions/3937648

(to install, use npm and modify webpack.config.js file, importing it and setting rules and plugins settings)
-add 
<link rel="stylesheet" type="text/css" href="/styles.css" /> in index.html <head>

-configure webpack.config.js sass-loader and css-loaders to work with sourcemaps again (use inline-source-map and set sourceMap option to true)

---------

TOOLS:

-Redux Devtools Extension for browser (used to view state easily): https://github.com/zalmoxisus/redux-devtools-extension
(Install in browser then modify 2ng argument code in configureStore.js based on README Docs for Basic Store setup)

=====================

GLOSSARY:

Reducers:

Actions:

Action Generators:

Selectors:

Components:

Higher Order Component:

Controlled Input: An input where the value is controlled by Javascript (i.e. by using an onChange or onClick attribute 
that handles the value), i.e. value={Javascript expression/function here}

=========


DEBUGGING TROUBLESHOOTING TIPS:


Checking Current Store State:
-use REDUX DEVTOOLS EXTENSION in Browser:
-Click on the last Action dispatched (at the bottom of list on left) and click on the STATE tab on the right side menu.  
-This shows you the current state object and what the most recent data is.

---

https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375

-Make sure you don't have two copies of react installed (caused by packages that have a dependency on REACT that make an additional different copy of REACT install, for example)
-Assuming you have source maps (or Webpack’s devtool: ‘eval’) enabled, open Sources tab in Chrome DevTools. Press Cmd+O (Ctrl+O on Windows) and type “React.js” and look for two copies of React.js listed.

-IF 'THIS' IS LOST: use .bind() and pass in the parent object you want 'this' to reference:

Ex:

const methodRef = obj.methodName.bind(obj);

---

-Make sure that in importing pages, you do not include the extension in the path or it could throw an error: 
Ex: import HelpPage from '../components/HelpPage';

and NOT: import HelpPage from '../components/HelpPage.js';

-------

-Make sure that index.html script src points to relative path for bundle.js using '/bundle.js' and NOT './bundle.js'!!
Ex:  <script src="/bundle.js"></script>
