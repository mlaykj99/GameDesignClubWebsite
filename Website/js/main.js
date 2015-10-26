/**
 * Created by Josh on 10/23/2015.
 */

$( document ).ready ( function ()
{
    updateHeader( 'home', 'li1', 'h' );
});

function loadFragment ( page )
{
    $( '#container').load( './views/' + page + '.html' );
}

function updateHeader ( page, liId, aId )
{
    setHeaderActive( liId, aId );
    loadFragment( page );
}

function setHeaderActive( liId, aId )
{
    var a = $( '#' + aId);

    $(document).find('.active').removeClass('active');
    $(document).find('.sr-only').remove();

    $( '#' + liId ).addClass( 'active' );
    a.html( a.html() + '<span class="sr-only">(current)</span>' );
}