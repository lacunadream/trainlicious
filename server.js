var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'YOUR_PUBLIC_KEY',
        privateKey: 'YOUR_PRIVATE_KEY'
    });
 
 var app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.json({ message: 'eff off' });   
});

app.post('/api', function(req, res) {
    var amount = req.body.amount
    var desc = req.body.desc
    var expM = req.body.expM
    var expY = req.body.expY
    var cvc = req.body.cvc
    var cn = req.body.cn
    var currency = req.body.currency
    client.payment.create({
    amount : amount,
    description : desc,
    card : {
       expMonth : expM,
       expYear : expY,
       cvc : cvc,
       number : cn
    },
    currency : currency
}, function(errData, data){
    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        res.json(errData.data.error.message)
        return;
    }
    console.log("Payment Status: " + data.paymentStatus);
    res.json(data.paymentStatus)
});
})

// app.post('/api/createAuth', function (req, res) {
// client.authorization.create({
//     amount : "2500",
//     description : "test authorization",
//     card : {
//        expMonth : "11",
//        expYear : "19",
//        cvc : "123",
//        number : "5555555555554444"
//     },
//     reference : "asd",
//     currency : "USD"
// }, function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
 
//     res.json(data)
// });
// })


client.payment.create({
    replayId : "A-77633219",
    amount : "2500",
    description : "shipment of two eggs in a glass bottle",
    authorization : "p65RyGaj",
    reference : "BCK2THEST",
    currency : "USD"
}, function(errData, data){
 
    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }
 
    console.log("Payment Status: " + data.paymentStatus);
});

//Sample data to be used
    // card : {
    //    expMonth : "11",
    //    expYear : "19",
    //    cvc : "123",
    //    number : "555 555 555 555 4444"
    // },
    // currency : "USD"


// client.cardtoken.create({
//     card : {
//        addressState : "MO",
//        expMonth : "11",
//        expYear : "19",
//        addressCity : "OFallon",
//        cvc : "123",
//        number : "5105105105105100"
//     }
// }, function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return (errData.data.error.message);
//     }
//     x = JSON.stringify(data.id)
//     console.log("Success Response: " + x);
//     client.payment.create({
//     amount : "1000",
//     token : "x",
//     description : "payment description",
//     currency : "USD"
// }, function(errData, data){
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
//     console.log("Payment Status: " + data.paymentStatus);
// });
//     fs.writeFile('wtf.txt', JSON.stringify(data.id))
// });



app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});