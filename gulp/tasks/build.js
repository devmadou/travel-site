/*
Main Goal
---------
This build task will get our files ready to go live by outputting only needed
super minimalist versions of the file required to make our site loads very fast
(like CSS, JS and images files...)
The deployable application will sit into the 'dist' folder

Even if a 'dist' is a very common name, GitHub Pages uses 'docs' as name instead
Therefore, we will adjust all these 'dist' references to be 'docs'
*/
var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

/*
We can spin up a preview server that uses our 'dist' folder as the base
We can do that using 'browsersync', we just need to point to our 'dist' folder
*/
gulp.task('previewDist', function(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    })
});


/*
Delete task
-----------
We will begin the build task by deleting the "dist" folder so we begin
each build with a clean slate

We also added the 'icons' task as a dependency so it triggers a fresh rebuild
of our icons sprites
*/
gulp.task('deleteDistFolder', ['icons'], function(){
    return del("./docs");
});

/*
Make our build task reusable (by allowing any kind of files to be copied too)
-----------------------------------------------------------------------------
As an example, we will imagine a scenario where we would also want to copy
our files in the 'additional-build-items-test' folder into our 'dist' folder
(it only contains a cat image for testing purpose)

The main idea is to include all the files into the 'app' folder,
then exclude the non desired files

(I tested it and deleted the folder as it was just an example!)
*/
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
    /*
    We select everything into our 'app' folder but we exclude other files
    for which we already have gulp tasks taking care of the processing and copy
    (like images, CSS, JS...)
    */
    var pathsToCopy = [
        './app/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**',
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"))
});

/*
Filter and compress images
--------------------------
This task will copy and compress all image files to the dist folder
We will specify multiple inputs

The '!' is here to exclude some files like the 'icons' folder since we now
only need the SVG file

The tool used to compress the images is 'gulp-imagemin'
(use --save-dev during install with npm)
Regarding the 'imagemin' section, it needs some configuration:
- 'progressive' will optimize our jpeg images even further
- 'interlaced' will help with any gif images we could have
- 'multipass' will help with our SVG files
*/
gulp.task('optimizeImages', ['deleteDistFolder'], function(){
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])  // Don't know why he excludes all the subfolders too after excluding the folder itself...
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

/*

*/
gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start('usemin');
});

/*
Handling CSS and JS
-------------------
Actually, the CSS and JS files we need to include are listed in the 'index.html'
We have:
- <link rel="stylesheet" href="temp/styles/styles.css">
- <script src="/temp/scripts/Vendor.js"></script>
- <script src="/temp/scripts/App.js"></script>

We want to perform the following tasks:
- Copy to dist folder
- Compress file-size
- Revision
    revision means adding a unique string of numbers and letters at the end
    of the file name (like styles.css --> styles-4b31z9.css)
    which will force web browsers to redownload the file if we have uploaded
    a new changed version of it

For these 3 steps, we can leverage a tool called 'usemin' (--save-dev)
that does everything for us automatically!!

In the 'index.html' file, we can wrap CSS and JS files between special
comments starting with the special build keywords that 'usemin' will understand
and process to make its work

'usemin' is configured here to compress and revision our files
Before here are the tools we will install via npm (--save-dev):
- gulp-rev (for revisioning)
- gulp-cssnano (compress our CSS)
-gulp-uglify (compress our JS)

One important thing
-------------------
The 'usemin' task will not begin until we trigger a fresh styles and scripts rebuild
Indeed, the 'styles' and 'scripts' task will generate fresh copies of our
CSS and JS files
This way, when running our 'build' task, we will always get the most updated code
*/
gulp.task('usemin', ['styles', 'scripts'], function(){
    // We start by copying all our HTML files
    return gulp.src("./app/index.html")
        .pipe(usemin({
            /*
            first function for revisionning and second for compression
            we use 'return' so gulp is aware when the function completes
            */
            css: [function(){return rev()}, function(){return cssnano()}],
            js: [function(){return rev()}, function(){return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

/* Main Build task that will contain all dependencies */
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);

/*
Now, in one swift move, Gulp will automatically run a fresh rebuild of our
CSS, out JS, it will regenerate our icon sprites, our custom modernizr files
and it will move everything perfectly into place in the 'dist' folder
*/