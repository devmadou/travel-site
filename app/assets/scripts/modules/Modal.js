import $ from 'jquery';

class Modal{
    /*
    We select
    - the open modal 'Get in Touch' button
    - the main modal <div>
    - the cross 'X' to close the modal
    
    */
    constructor(){
       this.openModalButton = $(".open-modal");
       this.modal = $(".modal");
       this.closeModalButton = $(".modal__close");
       this.events();
    }

    /*
    The 'this' keyword
    ------------------
    By the time these methods gets called, the 'this' keyword will be a reference
    to the calling element which can cause problems
    Therefore, we use the 'bind' method

    I guess it just says to the calling element (the 'Get in Touch' button
    for example call the method width 'this' being the 'Modal' instance
    instead of the DOM element...)
    */
    events(){
        // clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the X close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        // pushes any key (like the escape key)
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    /*
    Every key pressed has a specific code
    For example, the 'Escape' has a keycode of 27
    */
    keyPressHandler(e){
        if (e.keyCode == 27){
            this.closeModal();
        }
    }

    /*
    return false;
    -------------
    We included a 'return false;' because with links that have an 'href' property
    of '#', the default behavior is to automatically scroll to the top of the page
    and we want to prevent that behavior and that is what 'return false;' does
    */
    openModal(){
        this.modal.addClass("modal--is-visible");
        return false;
    }

    closeModal(){
        this.modal.removeClass("modal--is-visible");
    }

}

export default Modal;
