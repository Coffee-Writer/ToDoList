$(function() {
    
    //SETUP
    var 
    $list,
    $newItemForm,
    $newItemButton,
    $doneButton
    ;
    var item = '';
    $list = $('#theList');
    $newItemForm = $('#newItemForm');
    $newItemButton = $('#newItemButton');
    $doneButton = $('#doneButton');
    $itemDescription = $('#itemDescription');
    
    $('li').hide().each(function(index) {
        $(this).delay(450 * index).fadeIn(1600);                       //Fades in list items
    });
    
    //ITEM COUNTER
    function updateCount() {
        var numOfItems = $('#theList li[class!=complete]').length;     //'numIfItems' holds number of incomplete items
        $('#counter').text(numOfItems);                                //Puts 'numOfItems' into counter 
    }
    updateCount();
    
    //SETUP FORM FOR NEW ITEMS
    $newItemButton.show();
    $newItemForm.hide();
    $('#showForm').on('click', function() {                            //Toggles form on when clicked
        $newItemButton.hide();
        $newItemForm.show();
        $itemDescription.focus();        
    });
    $('#doneButton').on('click', function() {                          //Toggles form off when clicked
        $newItemForm.hide();
        $newItemButton.show();
    });
    
    //ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {
        e.preventDefault();
        var text = $('#newItemForm input:text').val();                  //Takes input field
        if (text) {
            $list.append('<li>' + text + '</li>');                      //Wraps it as a list item and appends it
            $('#newItemForm input:text').val('');                       //Empties field
            updateCount();
            $itemDescription.focus();
        }
    });
    
    //CLICK HANDLING ON LIST
    $list.on('click', 'li', function() {                                //When list item is clicked
        var $this = $(this);
        var complete = $this.hasClass('complete');
        
        if (complete === true) {                                        //If it has class "complete"
            $this.animate({                                             //Slide it to the right
                opacity: 0.0,
                paddingLeft: '+=180'
            }, 500, 'swing')
            setTimeout(function() {                                     //Remove it from the list
                $this.remove();
            }, 500);
        } else {                                                        //Otherwise
            item = $this.text();
            $this.remove();                                             //Remove it from the list
            $list                                                       //And fade it in as class "complete" at the bottom
                .append('<li class=\"complete\">' + item + '</li>')
                .hide().fadeIn(300);
            updateCount();
        }
    });
    
});

$(window).bind('beforeunload', function(){                              //Warning for leaving page
  return 'WARNING: Your list will not be saved.';
});