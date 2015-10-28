/**
 * Created by Josh on 10/26/2015.
 */

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