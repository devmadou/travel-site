/*
To leverage 'webpack' functionalities, we need to create a file that will tell
'webpack' about our project in the root directory of that same project
called 'webpack.config.js'

We will create an object called 'module.exports' that tells webpack what to do
here:
- entry     --> Specifies which files it should be looking at to create its bundle
- output    --> Where the final project bundled file should be put to

Then, the 'path' variable is just here to leverage the 'path' module so easily get
the absolute path of a file
(That absolute path keeps webpack happy according to the author...
I guess it runs in another context so it will get lost if the path is not absolute...)
*/

/*
------------
About Babel:
------------
Babel let us use ES6 features
To get it working, we need to install 3 packages:
- babel-core
- babel-loader  (this package will help us integrate babel with webpack)
- babel-preset-es2015

We use the same 'webpack.config.js' file to configure babel

After configuring babel, we are now ready to transform our Person object
into a class
*/

var path = require('path');

module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        // get the current directory name
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "App.js"
    },
    module: {
        // We specify the different loaders, we will only use one here
        loaders: [
            {
                // name of the loader we want to use
                loader: 'babel-loader',
                query: {
                    // Standard of JS we want to use
                    presets: ['es2015']
                },
                /*
                webpack expects a regular expression for the 'test' property
                this regex tells webpack we only want this babel loader
                to be applied to JavaScript files
                */
                test: /\.js$/,
                /*
                Not every JS files need to be converted into ES5 so
                we tell babel to exclude the entire 'node_modules' folder
                */
                exclude: /node_modules/
            }
        ]
    }
};

/*
Now, we just need to run the simple 'webpack' command that will initialize webpack
This will create our bundle file so we can include it into our HTML file
as replacement instead of the original file
*/
