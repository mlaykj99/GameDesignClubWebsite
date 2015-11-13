/**
 * Created by Josh on 10/26/2015.
 */

$( document ).ready ( function ()
{
    //TEST
    $.ajax({
        //url: "http://10.0.0.30:3000/games",
        url: "http://localhost:3000/games",
        method: "get",
        accepts: "application/json",
        contentType: "application/json",
        success: function(res){console.log(res);}
    });

});

function postContactUs()
{
    var email, name, comments, request;

    email    = $( '#email' ).val();
    name     = $( '#name' ).val();
    comments = $( '#comments' ).val();

    validateForm( 'nameGroup' );
    validateForm( 'emailGroup' );
    validateForm( 'commentsGroup' );

    if( valid_form )
    {
        request = JSON.stringify( {'name': name, 'email': email, 'comments': comments} );

        //TODO: Encrypt the request to the server

        //TODO: post to server with request
        console.log(request);
    }
}