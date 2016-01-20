$(function() {
    
    //SETUP
    var $list, $newItemForm, $newItemButton;
    var item = '';
    $list = $('ul');
    $newItemForm = $('#newItemForm');
    $newItemButton = $('#newItemButton');
    
    $('li').hide().each(function(index) {
        $(this).delay(450 * index).fadeIn(1600);            //Fades in list items
    });
    
    //ITEM COUNTER
    function updateCount() {
        var numOfItems = $('li[class!=complete]').length;    //'numIfItems' holds number of incomplete items
        $('#counter').text(numOfItems);                     //Puts 'numOfItems' into counter circle
    }
    updateCount();
    
    //SETUP FORM FOR NEW ITEMS
    $newItemButton.show();
    $newItemForm.hide();
    $('#showForm').on('click', function() {                 //Toggles form on when button is clicked, and hides the button.
        $newItemButton.hide();
        $newItemForm.show();
    });
    
    //ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {
        e.preventDefault();
        var text = $('input:text').val();                   //Takes input field
        $list.append('<li>' + text + '</li>');              //Wraps it as a list item and appends it
        $('input:text').val('');                            //Empties field
        updateCount();
    });
    
    //CLICK HANDLING
    $list.on('click', 'li', function() {                    //When list item is clicked
        var $this = $(this);
        var complete = $this.hasClass('complete');
        
        if (complete === true) {                            //If it has class "complete"
            $this.animate({
                opacity: 0.0,
                paddingLeft: '+=180'
            }, 500, 'swing'//, funtion() {                   <= ERROR HERE
//                $this.remove();                            //Animate it off the list
//            }
            );
        } else {                                            //Otherwise
            item = $this.text();
            $this.remove();                                 //Remove it from the list
            $list                                           //And fade it in as class "complete" at the bottom
                .append('<li class=\"complete\">' + item + '</li>')
                .hide().fadeIn(300);
            updateCount();
        }
    });
    
});