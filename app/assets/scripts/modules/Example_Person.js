console.log('------------------------------------');
console.log('Creating an object via a constructor');
console.log('------------------------------------');

/*
Let's create a more reusable object by
creating a constructor
We begin our blueprint name with a capital letter
*/

function OldPerson(fullName, favColor){
    this.name = fullName;
    this.favoriteColor = favColor;
    this.greet = function(){
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
    }
}

class Person{

    // We include the parameters here
    constructor(fullName, favColor){
        this.name = fullName;
        this.favoriteColor = favColor;
    }

    greet(){
        console.log("Hi there, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
    }

}

/*
We explicitly say what we want to export the file
so it becomes callable from outside the file it has been defined
Here, we are just exporting the Person constructor
*/

// --> module.exports = Person;

/*
Actually, since we configured babel, let's use the ES6 of exporting a class
*/

export default Person;
