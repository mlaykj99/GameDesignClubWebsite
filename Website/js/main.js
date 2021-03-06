/**
 * Created by Josh on 11/21/2015.
 */

var $window = $(window);
var $document = $(document);
var imageArray = ['./img/gallery/Garden_of_Eva.jpg'];
var initFrHeight;
var inLoad = false;

window.onload = function()
{
    console.log("loaded main.js");
    active();

    if(!window.location.href.endsWith('games.html'))
    {
        $("a[href*=#]").bind("click", function(e) {
            // prevent default action and bubbling
            e.preventDefault();
            e.stopPropagation();
            // set target to anchor's "href" attribute
            var target = $(this).attr("href");
            // scroll to each target
            $(target).velocity("scroll", {
                duration: 750,
                offset: -30,
                easing: "ease-in-out"
            });
        });

        $('#comments').css('height', '250px');
        $('#newsCont').css('height', 225 - $('#newsMoreLess').outerHeight() + 'px');
        personalContentShow(1);
    }
    else
    {
        imageArray = [];
        preload(imageArray);
        initFrHeight = $('#fr1').css('height');
        initFrHeight = Number(initFrHeight.substring(0,initFrHeight.length-2));
    }
};

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop() + 80;
    var window_bottom_position = (window_top_position + window_height - 81);

    $.each($('div'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
            $element.removeClass('x');
        } else {
            $element.removeClass('in-view');
            $element.removeClass('done');
            $element.addClass('x');
        }
    });
}

function animatePage()
{
    //Set elements in view
    check_if_in_view();

    //animate elements
    $.each($('.animation-element.in-view'), function()
    {
        var $element = $(this);
        if(!$element.hasClass('done'))
        {
            if ($element.hassClass('e-img'))
            {
                $element.velocity({top: '-30%'}, {duration: 0, easing: 'linear'});
                $element.velocity({top: '0px', opacity: 1}, {duration: 500, easing: 'linear'});
            }
        }
        /*if(!$element.hasClass('done'))
        {
            if($element.attr('id') == 'about_cont')
            {
                $element.velocity({left: '-30%'}, {duration: 0, easing: 'linear'});
                $element.velocity({left: '0px', opacity: 1}, {duration: 1000, easing: 'linear'});
            }
            else
            {
                $element.velocity({right: '-30%'}, {duration: 0, easing: 'linear'});
                $element.velocity({right: '0px', opacity: 1}, {duration: 1000, easing: 'linear', complete: setMargin($('#book_img'), $('#bp'))});
            }
            $element.addClass('done');
        }*/
    });

    $.each($('.animation-element.x'), function()
    {
        var $element = $(this);

        $element.css('opacity', 0);
    });

    //adjust nav bar highlighting
    var $cover = $('#i');
    var $about = $('#about_cont');
    if(!window.location.href.endsWith('gallery.html'))
    {
        if($window.scrollTop() > ($about.offset().top + $about.outerHeight()/1.5) ||
            $window.scrollTop() + $window.height() == $document.height()) { window.location.hash = '#contact_'; active(); }
        else if(!$cover.hasClass('in-view')) { window.location.hash = '#about_'; active(); }
        else { window.location.hash = '#_'; active(); }
    }
}

function animateForm()
{
    var $form = $('form');
    var $invis = $form.find('.invis');
    var $icon = $form.find('.g-icon');

    $form.velocity({
        borderRadius: "3em",
        width: "5em",
        height: "5em",
        paddingLeft: "0",
        paddingRight: "0",
        backgroundColor: "#8CC152",
        color: "#fff",
        borderColor: "#8CC152",
        boxShadowX: "0",
        boxShadowY: "0"
    }, {
        duration: 350,
        easing: "easeInQuad"
    });

    $invis.velocity({
        scale: 0,
        opacity: 0
    }, {
        duration: 150,
        easing: "easeInQuad"
    });

    $icon.velocity({
        scale: 1,
        opacity: 1
    }, {
        delay: 350,
        duration: 150,
        easing: "easeInQuad"
    });
}

function animateFormReverse()
{
    var $form = $('form');
    var $invis = $form.find('.invis');
    var $icon = $form.find('.g-icon');

    $form.velocity({
        borderRadius: "0",
        width: "100%",
        height: "100%",
        paddingLeft: "0",
        paddingRight: "0",
        backgroundColor: "#ffffff",
        color: "#000000",
        borderColor: "#ffffff",
        boxShadowX: "0",
        boxShadowY: "0"
    }, {
        duration: 350,
        easing: "easeInQuad"
    });

    $icon.velocity({
        scale: 0,
        opacity: 0
    }, {
        duration: 150,
        easing: "easeInQuad"
    });

    $invis.velocity({
        scale: 1,
        opacity: 1
    }, {
        delay: 350,
        duration: 150,
        easing: "easeInQuad"
    });
}

function validate()
{
    var result = [false, false, false, false, false]; //Overall_Valid, Name, Email, Subject, Message
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var subject = $('#subject').val().trim();
    var message = $('#comments').val().trim();
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

    //Check [isn't empty]
    if(name !== '') { result[1] = true; }
    if(subject !== '') { result[3] = true; }
    if(message !== '') { result[4] = true; }

    //Check email [RegExp above]
    if(re.test(email)) { result[2] = true; }

    result[0] = result[1] && result[2] && result[3] && result[4];

    return result
}

function submitForm()
{
    var json = {'name': '', 'email': '', 'subject': '', 'type': '', 'message': ''};

    //validate form
    var results = validate();

    if(results[0])
    {
        //animateForm();
        //setTimeout(animateFormReverse, 1500);

        json['name'] = $('#name').val().trim();
        json['email'] = $('#email').val().trim();
        json['subject'] = $('#subject').val().trim();
        json['type'] = $('#options').val().trim();
        json['message'] = $('#comments').val().trim();

        //postEmail(json);
        resetFormDisplay();
        $('#form')[0].reset();
    }
    else
    {
        formErrorDisplay(results);
    }
}

function resetFormDisplay()
{
    $('#nameGroup').removeClass('has-error');
    $('#emailGroup').removeClass('has-error');
    $('#subjectGroup').removeClass('has-error');
    $('#commentsGroup').removeClass('has-error');

    $('#ei1').css('opacity', 0);
    $('#ei2').css('opacity', 0);
    $('#ei3').css('opacity', 0);
    $('#ei4').css('opacity', 0);
}

function formErrorDisplay(r)
{
    resetFormDisplay();
    if(!r[1]) { $('#nameGroup').addClass('has-error'); $('#ei1').css('opacity', 1); }
    if(!r[2]) { $('#emailGroup').addClass('has-error'); $('#ei2').css('opacity', 1); }
    if(!r[3]) { $('#subjectGroup').addClass('has-error'); $('#ei3').css('opacity', 1); }
    if(!r[4]) { $('#commentsGroup').addClass('has-error'); $('#ei4').css('opacity', 1); }

    /*if(!r[5])
    {
        $('.text-danger').velocity({
            opacity: 1
        }, {
            duration: 350,
            easing: "linear"
        });
    }*/
}

function active()
{
    $('.active').removeClass();

    //Determine active
    var url = window.location.href;
    if(url.endsWith('#about') || url.endsWith('#about_')) { $('#about_link').addClass('active'); }
    else if(url.endsWith('#contact') || url.endsWith('#contact_')) { $('#contact_link').addClass('active'); }
    else if(url.endsWith('games.html')) { $('#games_link').addClass('active'); }
}

$window.on('scroll resize', animatePage);

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
    switchImage();
}

//-------------------------------------------------------------------------------------------------- NEW
function expandNews()
{
    console.log("Expand");
    $('#newsletter').velocity({
        height: '500px' }, {
        duration: 500,
        easing: "linear"
    });
    $('#newsCont').velocity({
        height: 475 - $('#newsMoreLess').outerHeight() + 'px' }, {
        duration: 500,
        easing: "linear"
    });
    $('#newsMoreLess').html('Less');
    document.getElementById('newsMoreLess').onclick = null;
    document.getElementById('newsMoreLess').onclick = contractNews;
}

function contractNews()
{
    console.log("Contract");
    $('#newsletter').velocity({
        height: '250px' }, {
        duration: 500,
        easing: "linear"
    });
    $('#newsCont').velocity({
        height: 225 - $('#newsMoreLess').outerHeight() + 'px' }, {
        duration: 500,
        easing: "linear"
    });
    $('#newsMoreLess').html('More');
    document.getElementById('newsMoreLess').onclick = null;
    document.getElementById('newsMoreLess').onclick = expandNews;
}

function personalContentShow(person)
{
    if ( person === 1 )
    {
        $('#p_cont').html('Josh Greenwell: </br>Computer Science Major and GIS Minor at the University of St. Thomas. </br>President of the Game Design Club.');
        $('#details_img').attr('src', './imgs/joshGreenwell.png');
    }
    else if ( person === 2 )
    {
        $('#p_cont').html('2: null');
        $('#details_img').attr('src', './imgs/commmingSoon2.png');
    }
    else if ( person === 3 )
    {
        $('#p_cont').html('3: null');
        $('#details_img').attr('src', './imgs/commmingSoon2.png');
    }
    else if ( person === 4 )
    {
        $('#p_cont').html('4: null');
        $('#details_img').attr('src', './imgs/commmingSoon2.png');
    }
}

function formTypeChange(type)
{
    var $subject = $('#subject');
    var $formPart2 = $('#formPart2');

    if(type == '1')
    {
        $formPart2.html(
            '<div class="form-group has-feedback" id="commentsGroup">' +
                '<label class="control-label" for="comments">Questions & Comments</label>' +
                '<textarea class="form-control" id="comments" placeholder="What\'s up?" aria-describedby="error4"></textarea>' +
                '<span id="ei4" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>' +
                '<span id="error4" class="sr-only">(error)</span>' +
            '</div>'
        );

        var $textArea = $('#comments');
        $textArea.css('height', '250px');
        $textArea.prop('disabled', false);
        $subject.prop('disabled', false);
    }
    else if(type == '2')
    {
        $formPart2.html(
            '<div class="form-group has-feedback" id="commentsGroup">' +
            '<label class="control-label" for="comments">Questions & Comments</label>' +
            '<textarea class="form-control" id="comments" placeholder="What\'s up?" aria-describedby="error4"></textarea>' +
            '<span id="ei4" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>' +
            '<span id="error4" class="sr-only">(error)</span>' +
            '</div>'
        );

        var $textArea = $('#comments');
        $textArea.css('height', '250px');
        $textArea.prop('disabled', true);
        $subject.prop('disabled', true);
    }
    else if(type == '3')
    {
        //TODO: Layer divs and use hide
        $subject.prop('disabled', true);
        $formPart2.html(
            '<div class="form-group has-feedback" id="superGroup">' +
                '<label class="control-label" for="supervisor">Supervisor</label>' +
                '<input type="text" class="form-control" id="supervisor" placeholder="Supervisor" aria-describedby="error4">' +
                //'<span id="ei3" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>'
                //'<span id="error3" class="sr-only">(error)</span>'
            '</div>' +
            '<div class="form-group has-feedback" id="supPhoneGroup">' +
                '<label class="control-label" for="sup_number">Supervisor\'s Number</label>' +
                '<input type="text" class="form-control" id="sup_number" placeholder="Supervisor\'s Number" aria-describedby="error5">' +
                //'<span id="ei3" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>'
                //'<span id="error3" class="sr-only">(error)</span>'
            '</div>' +
            '<div class="form-group has-feedback" id="eventGroup">' +
                '<label class="control-label" for="event">Event</label>' +
                '<input type="text" class="form-control" id="event" placeholder="Event" aria-describedby="error6">' +
                //'<span id="ei3" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>'
                //'<span id="error3" class="sr-only">(error)</span>'
            '</div>' +
            '<div class="form-group has-feedback" id="hoursGroup">' +
                '<label class="control-label" for="hours">Hours</label>' +
                '<input type="text" class="form-control" id="hours" placeholder="Hours" aria-describedby="error7">' +
                //'<span id="ei3" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="opacity: 0;"></span>'
                //'<span id="error3" class="sr-only">(error)</span>'
            '</div>'
        );

        //TODO: Validate input

    }
}