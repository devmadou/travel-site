import 'lazysizes';

/*
As we did for App.js, we need to go to our 'webpack.config.js' file
to create a bundled version of our 'Vendor.js' and feed it to the browser
After that, do not forget to include the generated 'Vendor.js' file in the 'temp'
folder into the 'index.html' file

The Vendor.js will be imported at the end of the head section because we want it
to run on the page as soon as possible so it performs its lazy loading work
*/