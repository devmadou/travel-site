/*

We will configure gulpt to automatically create an Icon Sprite so our site
loads a little bit faster

A sprite is a single image file that contains all our icons

This is useful because it avoids the user having to download
all the images needed for the app one by one
Instead, it creates a single image containing already all icons for download
thus allowing our website to load faster
*/

/*
We will configure gulp so it takes all of the images file in the 'icon' folder
and have them automatically merge into a single image file
*/

/*
To create sprites, we need to require the 'gulp-svg-sprite' package first
*/

/*
gulp-svg2png is used to generate a PNG version of our SVG sprite file
*/
var gulp = require('gulp');
svgSprites = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

/*
This 'config' object literal will be used to configure svgSprites
The 'config' variable just has a 'mode' property which has a 'css' property itself
This is enough to configure 'svg-sprites' and create the global single icon image
*/
var config = {
    /*
    'shape' is here to fix the SVG icons that have little artifacts
    due to slightly incorrect coordinates that lead to icons overlapping
    To fix it, we will add a 1px padding between each icons
    The padding value all depends on the overlapping notices via visual observation
    */
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css:{
            /*
            'variables' is here to create a filter function to select the right
            file (SVG or PNG) depending on browser support

            The main idea is to configure the template 'sprite.css' to select
            the PNG file for the '.no-svg .icons' selector

            Within that function we will return the 'render' method that will
            give us access to the CSS that lives in the template
            In that file, we will look for (and select) that sprite variable
            which is that dynamic filename we have no other way of predicting
            ('sprite-jdzjazda.svg')
            One we retrieve it, we will transform it

            'split' will create an array and remove the '.svg' extension
            so we can reform (join) it with the '.png' extension

            After that piece of configuration, you can look in the generated '_sprite.css'
            file into the 'app/assets/styles/modules' folder to see the correct path being
            set for the 'background-image' 'url' attribute of the '.no-svg .icons' selector
            */
            variables: {
                replaceSvgWithPng: function(){
                    return function(sprite, render){
                        // We simply select the sprite file and replace its extension with '.png' instead of svg
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            /*
            The 'sprite' attribute is the name of the output sprite file
            to me it seems like a MIME type... 
            Actually, I removed the 'svg/', indeed, we had: 'svg/sprite.svg'
            but when we added PNG support for non SVG browser I removed it...
            */
            sprite: 'sprite.svg',
            render: {
                /*
                The reason for that part is explained below
                We tell svg sprites to CSS (instead of less, sass, ...)
                The 'template' file will be processed and copied automatically
                into the './app/temp/sprite/css/svg' folder
                so we eventually will have:
                './app/temp/sprite/css/svg/sprite.css'
                */
                css:{
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

/*
The following task will be responsible for deleting useless sprite svg files
gathering the icons into a single file that could remain
Indeed, imagine we add or delete an icon and we run the 'icons' task again,
that task will create a new file sitting side by side to the same old sprite
svg file, files will accumulate and will occupy a lot of space in the future

We will proceed this way by deleting the sprite folder generated
via a new NPM package called 'del'

We provide the function an array of folders we want to delete
*/

gulp.task('beginClean', function(){
    return del(['.app/temp/sprite', './app/assets/images/sprites']);
})

/*
We can now create a new task that will performed the desired action
We do not want that task to begin when the 'createSprite' task has not finished
running yet, so we add the 'beginClean' task as a dependency
*/
gulp.task('createSprite', ['beginClean'], function(){
    /*
    We use gulp source to move all the icons into gulp's pipeline
    Whenever we use 'gulp.source', we should return something

    1. We grab all the images
    2. We copy these files to a new location (the 'temp' directory actually)
       so we use 'gulp.dest' and give it a directory name
    */
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprites(config))   // We pipe that file to our package, seems weird to me, as if it was going through a process via the whole library and was returned after...
        .pipe(gulp.dest('./app/temp/sprite'));
});

/*
We will add a task to create our PNG sprite file so we can use it for browsers
that do not support SVG files
This task will only run if the 'createSprite' task has run before
(Keep in mind we also need to update other task so they include the 'createPngCopy'
as a dependency like the 'copySpriteGraphic' and the 'icons' tasks)
*/
gulp.task('createPngCopy', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

/*
We have now successfully created our global icon file
But how do we sprite file to only display a specific icon in certain locations?
The answer is that we can apply the sprite file as a CSS background image
on different elements

But the main problem would be to identify in the global image each individual
icon by using its X and Y coordinates as well as its exact height and width
This would result for each icon in performing tedious accurate measuring

Fortunately, svg sprites can do the heavy lifting by specifying the 'render' object
attribute to the 'css' attribute of the config' object

The following takes place in the ./gulp/templates/sprite.css
*/

/*
This task is just here to copy the final sprite image into
the dedicated 'images' folder of the application to stay organized

We also took into account the file created with the PNG extension
for browser that does not support SVG

We added the dependency upon 'createPngCopy' because that task is dependent upon
the 'createSprite' task for SVG (PNG) support for browsers
*/
gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});
/*
To keep our CSS organized once we generated that CSS file containing
one CSS class per icon, we can use gulp to copy that file into the CSS modules
folder instead of importing it directly
This way, all our CSS we be in a centralized location

Let's create a new gulp task for that

Note that we added the 'createSprite' as a dependency so that 'copySprite'
task only runs when the 'createSprite' has run
*/

gulp.task('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

/*
After all the tasks ran, we can get rid of the temporary sprite folder
We can only clean everything once we have copied the desired files
thus the dependencies
*/
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    return del('./app/temp/sprite');
});

/*
Now, let say we wanted to add a new icon
We would have to call first the 'createSprite' task then the 'copySpriteCSS'
Let's create a new task that regroup them so we do not have to run them
separately
This task will be named 'icons'
*/

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
