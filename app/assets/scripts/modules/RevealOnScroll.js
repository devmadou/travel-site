/*
We will implement this feature for the 'Our features section'
For implementing this feature, we will make use of popular library called
-- Waypoints --, you can install it via NPM
npm install waypoints --save
*/

/*
This line of import for jQuery works as long as we have jQuery
into our 'node_modules' folder as a single file

For the waypoints library import, it is different because we do not
have the whole library contained within a single file
Instead, we need to manually points towards the 'node_modules' folder
and specify the exact file we want
*/
import $ from 'jquery';
import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{

    /*
    We select the element we want to reveal
    But logically, we need to hide them first if we want to reveal them on scroll
    */
    constructor(elements, offset){
        this.itemsToReveal = elements;    // A collection of elements
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints(){
        /*
        'each' is a jQuery method used to iterate on a collection
        The specified fonction will be executed for each item of the collection
        In that method, we will simply create waypoints for each items in the collection
        In that function, the 'this' keyword refers to the current item of the collection
        being processed not the actual object of type 'RevealOnScroll' being created 
        Instead, we store the actual object being created into the 'that' variable

        The 'Waypoint' constructor takes an object as agrgument:
        - element: The DOM element we want to select
        - handler: What we want to happen when that element is scrolled

        By default, the element fades in when it is position at the top of the page
        which seems very late
        Let's change that behavior by adding an offset property
        The default offset is 0% thus
        The bottom of our viewport is then set to 100%
        */
        var that = this;
        this.itemsToReveal.each(function(){
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: that.offsetPercentage
            });
        });
    }

}

export default RevealOnScroll;
