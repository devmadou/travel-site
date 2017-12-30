/*
First, we will modify our sticky header so that when we scroll down
the page, its background gets darker since the header is hardly visible
when the page gets lighter

We will actually use 'waypoints' to perform that task
We will consider our 'Your Clarity' main title to be the trigger waypoint element
so when it reaches it, the background header gets darker

Just for info, we leveraged a jQuery package to implement smooth scrolling
very easily
*/

import $ from 'jquery';
import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader{
    
    constructor(){
        // We point to the site header element
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint();
        // This is a collection of all our 'page-section' attributes
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
    }

    /*
    To implement this feature, we just need to call the 'smoothScroll' method
    on each navigation link and fortunately, we have already selected all our
    header links
    */
    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }

    /*
    For the 'element' property, waypoint is expecting us to provide a JavaScript
    native DOM element (but we are currently passing a jQuery object)

    We can access the native DOM element within a jQuery object very easily
    We just have to select the first element as we would do in a normal array
    This works because the 1st element in a jQuery array-like object
    is always a pointer to the native DOM element

    I guess the bottom line is getting an element via jQuery ($) does not return
    a native DOM object as when we do for example document.getElementByClassName
    but when using the '[0]', it actually equals that native DOM element

    We will remove the dark background if we scroll up passed the waypoint
    that is why we add or remove the 'dark' class depending on the direction
    we are scrolling to with the 'headerTrigger' element on the page as reference
    To make things easier, it appears the waypoint 'handler' accepts an argument
    we chose to call 'direction' that have the value 'down' (or 'up' I guess..)
    */

    createHeaderWaypoint(){
        var that = this;
        new Waypoint({
            element: that.headerTriggerElement[0],
            handler: function(direction){
                if (direction == 'down'){
                    that.siteHeader.addClass("site-header--dark");
                }
                else{
                    // It means we are scrolling up
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }

    /*
    This method creates a waypoint for each section of the page
    When a page section gets scrolled to, we just want to use
    our custom 'data' attribute as a jQuery selector to target
    the matching header link so we can give it a yellow modifier class

    The offset will trigger how early the waypoint will trigger the
    change in color of the nav links
    Indeed the default value make a section being highlighted only
    when the top of the section is at the top of the screen which is
    a bit late

    Here, when the top of the section is 18% at the top of the screen,
    the waypoint will be triggered --> when we are scrolling down
    (for when we are scrolling up, we created another waypoint)
    (instead of being triggered when the section is
    at the top of the screen so 0%)

    The bottom line is whichever section is taking up the majority of the screen
    should probably be considered the current section
    */
    createPageSectionWaypoints(){
        var that = this;
        this.pageSections.each(function(){
            var currentPageSection = this;

            // Down scrolling waypoint
            new Waypoint({
                element: currentPageSection,
                handler: function(direction){
                    if (direction == "down"){
                        console.log("Hi there !")
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        // This line will cause nothing in the header being highlighted
                        that.headerLinks.removeClass("is-current-link");
                        // Then we can highlight the appropriate current section link
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%" 
            });

            // Up Scrolling waypoint
            new Waypoint({
                element: currentPageSection,
                handler: function(direction){
                    if (direction == "up"){
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        // This line will cause nothing in the header being highlighted
                        that.headerLinks.removeClass("is-current-link");
                        // Then we can highlight the appropriate current section link
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-40%" 
            });

        });
    }

}

export default StickyHeader;
