/**
 * Created by Josh on 11/29/2015.
 */

var nodemailer = require('nodemailer');
var http = require('http');
var dispatcher = require('httpdispatcher');
var ursa = require('ursa');
var fs = require('fs');

const PORT=8080;

function handleRequest(request, response)
{
    try
    {
        console.log('Url: ' + request.url + '\n\t' + request.headers.origin);
        dispatcher.dispatch(request, response);
    }
    catch(err)
    {
        console.log(err);
    }
}

dispatcher.onPost("/email", function(req, res) {
    if(req.headers.origin === 'http://glmccoy.com')
    {
        parseDataAndSend(req.body);

        res.writeHead(200, {'Accepts': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://glmccoy.com'
        });
        res.end(JSON.stringify({'message': 'Got It.'}));
    }
    else
    {
        res.writeHead(401, {'Accepts': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://glmccoy.com'
        });
        res.end(JSON.stringify({'message': 'Bad Origin'}));
    }
});

var server = http.createServer(handleRequest);

server.listen(PORT, function()
{
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

function decrypt(data)
{
    var key = ursa.createPrivateKey(fs.readFileSync('../rsa_1024_priv.pem'));
    return key.decrypt(data, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING);
}

//EMAIL SERVICE
var item_price = 30;

function parseDataAndSend(data)
{
    data = JSON.parse(data);

    data['name'] = decrypt(data['name']);
    data['email'] = decrypt(data['email']);
    data['number'] = decrypt(data['number']);
    data['address'] = decrypt(data['address']);

    var message = createMessage(data['name'], data['email'], data['number'], data['address'], data['paintings']);
    sendMail(message, data['email']);
}

function createMessage(name, email, phone, address, items)
{
    var message = [];
    var temp;
    var price;
    var totalPrice = 0;
    // plane text
    temp =
        'Customer Name: ' + name +
        '-- Customer Email: ' + email +
        '-- Customer Phone: ' + phone +
        '-- Customer Address: ' + address +
        '-- Items: ';
    for(var i = 0; i < items.length; i++)
    {
        price = item_price*items[i]['quantity'];
        temp += '[' + items[i]['item'] + ' | ' + items[i]['quantity'] + ' | ' + price + ']';
        totalPrice += price;
    }
    temp += '-- Total Price: ' + totalPrice;
    message.push(temp);

    //html
    temp =
        '<b>Customer Name:&nbsp;</b>' + name +
        '<br><b>Customer Email:&nbsp;</b>' + email +
        '<br><b>Customer Phone:&nbsp;</b>' + phone +
        '<br><b>Customer Address:&nbsp;</b>' + address +
        '<br><table style="text-align: center;"><thead>' +
        '<th style="border-right: 1px solid #000; border-bottom: 1px solid #000;">Items</th>' +
        '<th style="border-right: 1px solid #000; border-bottom: 1px solid #000;">Quantity</th>' +
        '<th style="border-bottom: 1px solid #000;">Price</th></thead>' +
        '<tbody>';
    for(i = 0; i < items.length; i++)
    {
        temp += '<tr><td style="border-right: 1px solid #000;">' + items[i]['item'] +
            '</td><td style="border-right: 1px solid #000;">' + items[i]['quantity'] +
            '</td><td>$' + (item_price*items[i]['quantity']) + '</td></tr>';
    }
    temp += '</tbody></table>' +
            '<br><h4>Total:</h4><p>$' + totalPrice + '</p>';
    message.push(temp);

    return message;
}

function sendMail(message, customer_email)
{
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'joshgreenwell99@gmail.com',
            pass: '@graph22'
        }
    });

    // setup e-mail data
    var mailOptions = {
        from: 'glmccoy.com <from@gmail.com>',
        to: 'joshgreenwell99@gmail.com',
        subject: 'Purchase Request (glmccoy.com)',
        text: message[0],
        html: message[1]
    };
    var customerMail = {
        from: 'glmccoy.com <from@gmail.com>',
        to: customer_email,
        subject: 'Order Confirmation',
        text: 'We received your order! - You will be contacted within 24 hours to complete your order.' + message[0],
        html: '<h2>We received your order!</h2>' +
              '<br><p>You will be contacted within 24 hours to complete your order.</p>' + message[1]
    };

    // send mail to glmccoy
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

    // send mail to customer
    transporter.sendMail(customerMail, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}