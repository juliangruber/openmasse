// Settings
var jQueryVersion = '1.6.2';

// Include jquery if not already loaded
if (typeof jQuery != 'undefined')
{
    // Matching jquery found
    if ($().jquery == jQueryVersion)
    {
        console.log('jQuery found.');
    }
    // TODO: Does the used jQuery have all we need?
    // TODO: Include jQuery in its own context
}
// No jQuery found
else
{
    // Include jQuery
    var scriptElement = document.createElement('script');
    scriptElement.src = 'js/jquery/jquery-'+jQueryVersion+'.js';
    document.body.appendChild(scriptElement);
    console.log('jQuery included.');
    // TODO: Wait for jQuery to have finished loading
}

// We have the power of jQuery from now on

// Display help
var helpText = 'Drag a box over the set of links you wish to open (press ESC to abort).';
$('body').append('<div id="openmasseHelp">'+helpText+'</div>');
// Style help
$('#openmasseHelp').css({
    'background-color': 'lightgrey',
    'position':'absolute',
    'top': '0',
    'left': '0',
    'width': 200
});
// Add behaviour to help
$('#openmasseHelp').mouseover(function() {
    if ($('#openmasseHelp').position().left == 0)
    {
        $('#openmasseHelp').css({'left':'auto','right':'0'})
    }
    else
    {
        $('#openmasseHelp').css({'right':'auto','left':'0'});
    } 
});

var from, to;

// Initialize logic and drawing
$('html').mousedown(function(event){
    event.preventDefault();
    console.log('dragging started at x=' + event.pageX +',y=' + event.pageY);
    from = {'x': event.pageX, 'y': event.pageY};
    // TODO: update link count
    $('body').append('<div id="openmasseBox"></div>');
    $('#openmasseBox').css({
        'background-color': 'grey',
        'opacity': 0.5,
        'position':'absolute',
        'top': event.pageY,
        'left': event.pageX,
        'width': 0,
        'height': 0
    });
    // set up dragging
    $('html').mousemove(function(eventmove){
        // v >
        if (eventmove.pageX >= from.x && eventmove.pageY >= from.y)
        {
            $('#openmasseBox').css({
                'top': from.y,
                'left': from.x,
                'width': eventmove.pageX-from.x,
                'height': eventmove.pageY-from.y
            });
        }
        // ^ >
        else if (eventmove.pageX >= from.x && eventmove.pageY <= from.y)
        {
            $('#openmasseBox').css({
                'top': eventmove.pageY,
                'left': from.x,
                'width': eventmove.pageX-from.x,
                'height': from.y-eventmove.pageY
            });
        }
        // v <
        if (eventmove.pageX <= from.x && eventmove.pageY >= from.y)
        {
            $('#openmasseBox').css({
                'top': from.y,
                'left': eventmove.pageX,
                'width': from.x-eventmove.pageX,
                'height': eventmove.pageY-from.y
            });
        }
        // ^ <
        if (eventmove.pageX <= from.x && eventmove.pageY <= from.y)
        {
            $('#openmasseBox').css({
                'top': eventmove.pageY,
                'left': eventmove.pageX,
                'width': from.x-eventmove.pageX,
                'height': from.y-eventmove.pageY
            });
        }

    });
});
$('html').click(function(event){event.preventDefault()});
$('html').mouseup(function(event){
    event.preventDefault();
    console.log('dragging stopped at x=' + event.pageX +',y=' + event.pageY);
    to = {'x': event.pageX, 'y': event.pageY};
    // we don't need to update the box any more
    $('html').unbind('mousemove');
    $('#openmasseBox').remove();
    // Open Links
    $('a').each(function(){
        // ugly as fuck...
        if (
            ((from.x <= $(this).offset().left+$(this).width() && to.x >= $(this).offset().left) ||
             (from.x >= $(this).offset().left && to.x <= $(this).offset().left+$(this).width())) &&
            ((from.y <= $(this).offset().top+$(this).height() && to.y >= $(this).offset().top) ||
             (from.y >= $(this).offset().top && to.y <= $(this).offset().top+$(this).height())) 
           )
        {
            window.open($(this).attr('href'));
        }
    });
});
$('html').keydown(function(){
    // ESC pressed
    if (event.keyCode == '27')
    {
        // Tidy up
        $('html').unbind('mousedown');
        $('html').unbind('mouseup');
        $('html').unbind('click');
        $('#openmasseHelp').remove();
    }
});
