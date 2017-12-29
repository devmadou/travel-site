var gulp = require('gulp'),   // Basic gulp plugin
watch = require('gulp-watch'),    // Plugin that watches changes of files in our system
browserSync = require('browser-sync').create();

/*
Browsersync is a package that does a lot of things
One of its abilities is to auto-refresh the web browser
whenever we change our HTML/CSS
*/

/*
Calling a task will result in executing the passed anonymous function
*/

/*
***********
BrowserSync
***********

The 1st thing to do with browserSync is to tell it where our website lives
This is because browserSync spins up a little web server on our computer
and it needs to know where that webserver should point

When running the gulp 'watch' task, browserSync will automatically run the browser
and navigate to a default URL corresponding to the server it put in place

Another cool feature of browserSync is that if we open several browsers,
when scrolling, they are syncronized and move together

Also when running, BrowserSync provides a URL to test your site on a mobile device
like that (assuming you are using the same internet connection as your computer)
   Local: http://localhost:3000
External: http://192.168.1.58:3000 (go to that URL to test on a mobile device)

*/
gulp.task('watch', function(){
  browserSync.init({
    server:{
      baseDir: "app"    // Where the index.html file lives
    }
  });
  /*
  Here, 'watch' is the name of the method that watches file changes
  We git it the file(s) to watch as argument and pass an anonymous function
  to be executed everytime the file(s) changes
  */

  watch('./app/index.html', function(){
    /*
    We want browserSync to reload the page automatically
    everytime we make a change to 'index.html'
    */
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function(){
    /*
    The 'start' function starts a specific task
    By the way, we could have done the same as for html and reloading the page
    but browserSync has a better feature for CSS and can inject the updated CSS
    on the fly without even having to refresh the page
    (via the browserSync.stream() function)

    That is why we created an entire new task 'cssInject'
    */
    gulp.start('cssInject');
  });

  /*
  We can watch changes for any of our JavaScript files too
  */
  watch('./app/assets/scripts/**/*.js', function(){
    gulp.start('scriptsRefresh');
  });

});

/*
This is a way to define a dependency between square brackets: '[]'
so the specified task only run when the dependency has completed (so ran)
The idea is the 'cssInject' task will only run if the 'styles' one has run and completed successfully
The role of the 'cssInject' task is to 'inject' the content of the final temp CSS file
instead of having to refresh the page
*/
gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css')
          .pipe(browserSync.stream());
});

/*
We also want browserSync to reload the page when the changes on our JS
have loaded and been applied
*/

gulp.task('scriptsRefresh', ['scripts'], function(){
  browserSync.reload();
});
