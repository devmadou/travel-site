/*
This file is dedicated to the mobile menu
*/

/*
We can import jQuery very easily
I guess we can import any package installed into 'node_modules' via this syntax...
*/

import $ from 'jquery';

class MobileMenu{

    constructor(){
        /*
        This very classic example is messy in the way that we are doing in a few
        lines of code several different steps
        
        More precisely, this is what the author calls jQuery Spaghetti
        - Selecting elements from the DOM
        - Event handling
        - Defining functionality
        */
        /*
        $(".site-header__menu-icon").click(function(){
            console.log("The top right icon was clicked!");
        });
        */

        /*
        This is a cleaner way of doing things
        1. The constructor will contain any property or shortcut that stores our
           DOM selection for the menu icon element ('this.menuIcon' property)
        2. We will any events we want to watch for ('events' method)
        3. We move the functions to be executed for an event in their own block
           and call them when needed ('toggleTheMenu' method)
        4. Then, in the constructor after defining the properties, we can call
           the 'events' method once for all that will handle all defined events
           ('this.events()')
        */

        /*
        We select the site-header here in the objective to make it
        more visible on smaller screens
        Basically and I think it will often come to this, its about...:
        - selecting the element
        - adding a modifier class via a toggling system
        */
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        this.events();
    }

    events(){
        // The '.bind(this)' element is explained just below
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        console.log('1st this:');
        console.log(this);
    }

    toggleTheMenu(){
        /*
        Once we selected the div containing the nav links that was hidden,
        we will add a new class to it by using the native 'toggleClass' method
        */

        /*
        --------------
        IMPORTANT NOTE
        --------------
        When running executing the following line, we get an error
        This is because the 'this' used in this method is different from the one
        used at its calling point which will be a reference to the caller element

        The 1st time we are logging the 'this' keyword, it is pointing
        to an instance of our MobileMenu class

        Then, when we click the top right icon, the 'this' keyword is set to
        the element that was just cliked on which is the small button
        This is useful if we want to act on the element we clicked on
        like removing it via this.remove() for example

        In our case, we do not want the 'this' keyword to equal the element
        that triggered the event
        Insead, we want the 'this' keyword to point back to our object
        so we can use it to access our defined properties and methods

        To remediate that behavior, we use the JavaScript 'bind' method.
        Here is how it works: anything passed in the paranthesis will be used
        as the 'this' keyword when executing the called method
        We can now pass our current 'this' corresponding to the MobileMenu instance
        */
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
        console.log('2nd this:');
        console.log(this);
    }

}

export default MobileMenu;
