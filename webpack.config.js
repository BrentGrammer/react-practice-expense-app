const path = require('path');
// need to require webpack in order to use builtin DefinePlugin (used for setting client side Javascript
// env vars to NODE ENV vars for development when using a separate test database):
const webpack = require('webpack');
// mini-css-extract-plugin for extracting css from bundle.js:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// This variable is builtin to define the environment currently in.  It will be 'test' when running the jest script set
// in package.json scripts, and it will be 'production' set automatically by Heroku if deployed.  If it is unset, then
// we set it here to 'development':
// (The purpose of setting this up is so that you can have a test database and environment to run tests without
//  affecting your production db or app)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// This assigns the KEY=values defined in the .env files in the root (.env.test, .env.development) for each database 
// (test and development/prod db) to process.env.[CORR_KEYS]  so that the database config used will be different if in 
// testing env:
if (process.env.NODE_ENV === 'test') {
  // require the npm dotenv module (installed with npm) and pass in the options object to config() which you define
  // the path to the .env file where you set up the corresponding KEY=values to use to set process.env to in the current
  // envronment:
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  console.log(env);
  // for using mini-css-extract-plugin for separating css from bundle.js to define the filename in plugins to extract css to:
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
  // this will check if env was set to production by running npm run build:prod which is webpack with -p --env production flag:
  const isProduction = env === 'production';

   return {
    entry: './src/app.js',
    output: {
      // specifies where the bundle files built with webpack are dumped.
      // put the files in a /dist/ subfolder so they are easier to find and work with on the server:
      path: path.join(__dirname, 'public', 'dist'),
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
            // this is recommended by docs: don't use style-loader if in production mode:
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                  // option added to use the sourcemap inline-source-map after production changes
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                  // option added to use the sourcemap inline-source-map after production changes
                    sourceMap: true
                }
            }        
          //'css-loader', // from older config before using css mini extract plugin
          //'sass-loader' // from older config before using css mini extract plugin
         ]
       }
      ]
    },
    plugins: [
      // sets the filename to extract css to - defined at top of module:
      CSSExtract,
      // this is used to manually pass env variables to client side Javascript for development purposes:
      new webpack.DefinePlugin({
        // include the thing you want to define in quotes:
        // This is the variable set in the client side javascript and then you get it' value from same variable in the 
        // NODE environment: 
        // **NOTE: Because of how DefinePlugin works, you need to stringify the value in the object passed in, or
        // add single quotes inside double quotes (DefinePlugin removes double quotes from the value, changing it from 
        // a string to a variable reference)
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      // contentBase is where webpack points the server to look for the virtual assets to serve 
      // (the server does not write assets to the filesystem)
      // the contentBase path should be the same as the output path
      // (the asset files build with webpack are outputted to /public/dist/)
      contentBase: path.join(__dirname, 'public'),
      open: true,
      historyApiFallback: true, // required for use with React-Router - this serves index.html when a 404 is returned
      // This is where the bundled files to serve virtually are stored and the server will be pointed here to find them:
      // Note: the path is relative to the server root (/public/) so the first / represents a level nested in to that folder
      // Also note: you need to include forward slashes on either end of the subfolder specified in the string.
      publicPath: '/dist/'
    }
  };
};
