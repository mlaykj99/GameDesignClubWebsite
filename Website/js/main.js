/**
 * Created by Josh on 10/23/2015.
 */

//This is for the contact page
var valid_form = [ false, false, false, false ];

$( document ).ready ( function ()
{
    //TODO: Server keeps track of current page and will update accordingly
    updateHeader( 'home', 'li1', 'h' );
});

/* --- Navigation Functions Start --- */
function updateHeader ( page, liId, aId )
{
    setHeaderActive( liId, aId );
    loadFragment( page );
}

function loadFragment ( page ) { $( '#container' ).load( './views/' + page + '.html' ); }

function setHeaderActive( liId, aId )
{
    var a = $( '#' + aId);

    $( document ).find( '.active' ).removeClass( 'active' );
    $( document ).find( '.sr-only' ).remove();

    $( '#' + liId ).addClass( 'active' );
    a.html( a.html() + '<span class="sr-only">(current)</span>' );
}
/* --- Navigation Functions End --- */

/* --- Form Functions Start --- */
/*function onContactLoad()
{
    $( '#name' ).focusout( validateForm( 'nameGroup' ) );
    $( '#email' ).focusout( validateForm( 'emailGroup' ) );
    $( '#comments' ).focusout( validateForm( 'commentsGroup' ) );
}*/

function setFormSuccess( id )
{
    console.log("Success");
    var formField = id.substring( 0, id.indexOf('G') );
    var element = $( '#' + id );
    var input = $( '#' + formField );
    var error = $( '#' + formField + 'X' );
    var error2 = $( '#' + formField + 'Error' );

    element.removeClass( 'has-error' );
    error.remove();
    error2.remove();

    element.addClass( 'has-success' );
    element.html (
        element.html() +
        '<span id="' + formField + 'Check" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>' +
        '<span id="' + formField + 'Success" class="sr-only">(success)</span>'
    );
    input.attr( 'aria-describedby', formField + 'Success' );
}
function setFormError( id )
{
    console.log("Error");
    var formField = id.substring( 0, id.indexOf('G') );
    var element = $( '#' + id );
    var input = $( '#' + formField );
    var success = $( '#' + formField + 'Check' );
    var success2 = $( '#' + formField + 'Success' );

    element.removeClass( 'has-success' );
    success.remove();
    success2.remove();

    element.addClass( 'has-error' );
    element.html (
        element.html() +
        '<span id="' + formField + 'X" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>' +
        '<span id="' + formField + 'Error" class="sr-only">(error)</span>'
    );
    input.attr( 'aria-describedby', formField + 'Error' );
}
function validateForm( id )
{
    console.log("In validate");
    var valid = true;
    var field = id.substring(0, id.indexOf('G'));
    var element = $( '#' + field );

    if( element.val() === '' ) { valid = false; }
    if( field === 'email' && element.val().substring(element.val().length-4) !== '.edu' ) { valid = false; }

    console.log(id + " | " + field + ' | ' + element.val());
    if( valid )
    {
        setFormSuccess( id );
        if( field === 'name' ) { valid_form[1] = true; }
        else if( field === 'email' ) { valid_form[2] = true; }
        else if( field === 'comments' ) { valid_form[3] = true; }
        if( valid_form[1] && valid_form[2] && valid_form[3] ) { valid_form[0] = true; }
    }
    else
    {
        setFormError( id );
        valid_form[0] = false;
        if( field === 'name' ) { valid_form[1] = false; }
        else if( field === 'email' ) { valid_form[2] = false; }
        else if( field === 'comments' ) { valid_form[3] = false; }
    }
}
/* --- Form Functions End --- */