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
        //preload(imageArray);

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
        /*var $element = $(this);
        if(!$element.hasClass('done'))
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

function enlarge(img)
{
    var $element = $('#enlarge');
    var $img = $('#enlargeI');
    var $bg = $('#bFade');
    var $btn = $('#exBtn');

    $img.attr('src', img);
    $img.load( function() {
        $img.css('margin-top', (-((Number($img.css('height').substring(0, $img.css('height').length-2)))/2)) + 'px');
        $img.css('margin-left', (-((Number($img.css('width').substring(0, $img.css('width').length-2)))/2)) + 'px');

        console.log($element.height()/2);
        console.log(Number($img.css('height').substring(0, $img.css('height').length-2)));

        $btn.css('top', Number($img.css('height').substring(0, $img.css('height').length-2))/2 + ($element.height()/2) + 10 + 'px');
        $btn.css('left', ($window.width()/2 - (Number($img.css('width').substring(0, $img.css('width').length-2))/2)) + 'px');
        $btn.css('width', Number($img.css('width').substring(0, $img.css('width').length-2)) + 'px');

        $element.css('z-index', 10);
        $element.velocity({
            opacity: 1
        }, {duration: 500,
            easing: 'linear'});

        $bg.css('z-index', 2);
        $bg.velocity({
            opacity:.5
        }, {duration: 750, easing: 'linear'});

        $btn.on('click', descale);
    });
}

function descale()
{
    var $element = $('#enlarge');
    var $bg = $('#bFade');

    $element.velocity('stop', true);
    $bg.velocity('stop', true);

    $element.velocity({
        opacity: 0
    }, {duration: 500,
        easing: 'linear',
        complete: function() {
            $element.css('z-index', -1);
        }
    });

    $bg.velocity({
        opacity:0
    }, {duration: 250,
        easing: 'linear',
        complete: function() {
            $bg.css('z-index', -1);
        }
    });
}

function addItem(name, price)
{
    var rows;
    var height;
    var frHeight;
    var newHeight;

    addRow(name, price);
    $('#price').html('$' + (Number(($('#price').html()).trim().substring(1)) + price) + '.00');

    rows = $('#cartList tbody tr');
    height = rows.css('height');
    newHeight = (rows.length+1) * (Number(height.substring(0,height.length-2)));
    frHeight = $('#fr1').css('height');
    frHeight = Number(frHeight.substring(0,frHeight.length-2));
    $('#fr1').css('height', (Math.max(frHeight, newHeight)) + 'px');

    added();
}

function added()
{
    var $added = $('#added');

    $added.velocity('stop', true);
    $added.css('z-index', -1);
    $added.css('opacity', 0);

    $added.css('z-index', 100);
    $added.velocity({opacity: 1}, {duration: 250, easing: "linear"});
    $added.velocity({opacity: 0}, {delay: 550, duration: 450, easing: "linear"});
    $added.velocity({'z-index': -1}, {delay:1000});
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

function addRow(name, price)
{
    var exists = false;
    $('#cartList tbody tr').each(function(){
        var cells = $(this).find('td');
        if(cells[0].innerHTML === name)
        {
            cells[1].innerHTML = Number(cells[1].innerHTML) + 1;
            cells[2].innerHTML = '$' + (Number(cells[2].innerHTML.substring(1)) + price) + '.00';
            exists = true;
            return !exists;
        }
    });

    if(!exists)
    {
        $('#cartList > tbody:last').append('<tr>' +
            '<td class="g-item">' + name + '</td>' +
            '<td class="g-item-quantity">' + 1 + '</td>' +
            '<td class="g-item-price">$' + price + '.00</td>' +
            '<td class="btn btn-danger g-item-remove pull-right" onclick="removeRow($(this).parent())">X</td>' +
            '</tr>'
        );
    }
}

function removeRow(row) {
    var cur = Number($('#price').html().trim().substring(1));
    var price = Number(row.find('td')[2].innerHTML.substring(1));

    $('#price').html('$' + (cur - price) + '.00');
    row.remove();

    var rows;
    var height;
    var frHeight;
    var newHeight;

    rows = $('#cartList tbody tr');
    if (rows.length > 0)
    {
        height = rows.css('height');
        frHeight = $('#fr1').css('height');
        frHeight = Number(frHeight.substring(0, frHeight.length - 2));
        newHeight = frHeight - (Number(height.substring(0, height.length - 2)) + 3);
        $('#fr1').css('height', (Math.max(initFrHeight, newHeight) + 'px'));
    }
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

function switchImage()
{
    if(!window.location.href.endsWith('gallery.html'))
    {
        $('.home-img').css('background-image', "url('./img/gallery/Garden_of_Eva.jpg')");
    }
}

//-------------------------------------------------------------------------------------------------- NEW
function expandNews()
{
    $('#newsletter').css('height', '50em');
    $('#newsMoreLess').html('Less');
    $('#newsMoreLess').on('click', function() { despandNews() });
}

function despandNews()
{
    $('#newsletter').css('height', '20em');
    $('#newsMoreLess').html('More');
    $('#newsMoreLess').on('click', function() { expandNews() });
}

function personalContentShow(person)
{
    if ( person === 1 )
    {
        $('#p_cont').html('1 ');
    }
    else if ( person === 2 )
    {
        $('#p_cont').html('2 ');
    }
    else if ( person === 3 )
    {
        $('#p_cont').html('3 ');
    }
    else if ( person === 4 )
    {
        $('#p_cont').html('4 ');
    }
}

function formTypeChange(type)
{
    var $textArea = $('#comments');
    var $subject = $('#subject');

    if(type == '1')
    {
        $textArea.prop('disabled', false);
        $subject.prop('disabled', false);
    }
    else if(type == '2')
    {
        $textArea.prop('disabled', true);
        $subject.prop('disabled', true);
    }
    else if(type == '3')
    {
        $subject.prop('disabled', true);

        //TODO: Remove textarea and add service hours inputs
    }
}