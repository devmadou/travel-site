/*
Any time we save a change to any of our JS files,
webpack will automatically be trigerred to bundle everything again
Actually, webpack itselft already comes with the ability to watch our files
and can even spin up its own webpack dev server
but we will not use these features since our project already makes extensive use of
gulp and browsersync

What we will do instead is to integrate WEBPACK into our
existing GULP automation
*/

var gulp = require('gulp'),
webpack = require('webpack');

// The 'callback' argument is here to ensure that gulp is aware when webpack completes
gulp.task('scripts', ['modernizr'], function(callback){
    /*
    We call 'webpack' as in command line and 
    help webpack by providing our webpack config file location
    We can specify a function to run when our webpack setup has completed
    */
    webpack(require('../../webpack.config'), function(err, stats){

        if (err){
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();     // Gulp will be certain that webpack completed
    });
});
