/*
Do not forget to 'require' this file in the main gulpfile.js

What does Modernizr do
----------------------
In fact, Modernizr has the potential to test browsers for hundreds of features
like SVG support, flexbox, opacity...
However, the more features we test for, the larger the modernizr JavaScript
file becomes and the more it will slow things down for our visitors

This 'gulp-modernizr' package will let us build our own copy of Modernizr
that only includes the code to test for the certain features we need to test for
This way, our modernizr file will be as small as possible resulting in our
website loading faster

How we leverage Modernizr
-------------------------
In order for the package to know which features we need to test for,
we point it towards our project CSS and JavaScript files (all) within 'gulp.src()'
and we pipe that group of files trough the modernizr package
(where we can specify multiple options),
it will look at our code and automatically dertermine which features
we need to test for and will generate a nice lightweight custom modernizr JavaScript
file and we pipe that resulting file to our destination
Eventually, a file called 'modernizr.js' will be generated into our
specified destination, and we will just have to include that file into our main
'Vendor.js' file
Last step is to go to the './app/gulp/task/templates/sprite.css'
and configure the ".no-svg .icon" selector so it uses the no SVG version
of the sprite file for non supporting browsers

*/

var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

/*
We will also configure that task so it gets automatically triggered
by including it as a dependency of the 'scripts' task defined
into the 'scripts.js' file
*/
gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            "options": ["setClasses"]   // Author did not detailled that "setClasses" option meaning...
        }))
        .pipe(gulp.dest('./app/temp/scripts/'));
});
