var gulp = require('gulp');
svgSprites = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
    mode: {
        css:{
            /* The 'sprite' attribute is the name of the output sprite file
            to me it seems like a MIME type... */
            sprite: 'svg/sprite.svg',
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

gulp.task('beginClean', function(){
    return del(['.app/temp/sprite', './app/assets/images/sprite']);
})

gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprites(config))
        .pipe(gulp.dest('./app/temp/sprite'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
