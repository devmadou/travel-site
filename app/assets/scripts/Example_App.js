/*
An Object is an entity that has --- Data and Behavior---
                            or  --- Nouns and Verbs
*/

/*
'john' is the object,
'name' is a noun
'greet' is a verb
*/

console.log('-----------------------');
console.log('Creating a basic object');
console.log('-----------------------');

var john = {
    name: "John Doe",
    favColor: "blue",
    greet: function(){
        console.log("Hello, my name is " + john.name + " and my favorite color is " + john.favColor);
    }
};

john.greet();

/*
This 'john' object is not reusable, let's create a more reusable object by
creating a constructor called 'Person'
We begin our blueprint name with a capital letter

Now, instead of opening up a list of curly brackets and listing the properties
of the object, we will use the 'new' keyword in JavaScript
(Person's declaration has been moved to a new file 'Person.js')
which is an operator that will create a new instance of our 'Person' object type
or in other words, this will create a new object using our Person blueprint

By the way, 'this' is a reference to whichever object is being created
*/

console.log('-----------------------------------------------------------');
console.log('Staying organized: Split up our JS code into multiple files');
console.log('-----------------------------------------------------------');

/*
Our goal is to move the Person class or blueprint into its own separate file
Then we will just need a way to import that Person class into this file
(Just to clarify, in ES5, there is no concept of class, but we still use the
word class because it makes sense here...)
*/

// The 'require' syntax does not need the '.js' syntax (no extension needed)
// ---> var Person = require('./modules/Person');

/*
This 'require' syntax does actually not work in the web browser,
it works in our gulp files because gulp uses the node module,
to take advantage of that, and make it work, we need to install the 'webpack'
package

'webpack' will detect all the imported files and bundle all into a single JS file
that will work in people web browsers

To leverage 'webpack' functionalities, we need to create a file that will tell
'webpack' about our project in the root directory of that same project
called 'webpack.config.js'
*/

var john = new Person("John Doe", "blue");
john.greet();

class Adult extends Person{
    payTaxes(){
        console.log(this.name + " now owes $0 in taxes.");
    }
}

var jane = new Adult("Jane Smith", "purple");
jane.greet();
jane.payTaxes();

/*
Once everything is setup check how webpack is efficient with that jquery example:
Here, we remove all the '<h1>' tags
*/

var $ = require('jquery');
$("h1").remove();

/*
Gulp-webpack test
*/

alert("ABC 321");

/*
--------------------------------------------------
New way of imorting and exporting a module via ES6
--------------------------------------------------

Once we configured babel to use ES6, we can import modules and classes
in a better manner
Indeed, we used 'require' that is not a part of the JS language but a part
of NodeJS

We used it because for ES5 there was no native way of importing a module
But now with ESS6, we can do that import by using native JavaScript
(by talking of ES6) via the 'import...from' syntax

Same goes for exporting, we can take advantage of that syntax
In the Person.js file, we use now:
---> export default Person;
Instead of:
---> module.exports = Person;

*/
import Person from './modules/Person';
