var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
 
 var app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.json({ message: 'eff off' });   
});

 app.get('/api/query', function (req, res) {
    var dest = req.query.dest;
    var dept = req.query.dept;
    var time = req.query.time;

    var result = Math.random() * time

    var x = {"Crowd Score":result, "Departure":dept, "Destination":dest}
    console.log(x)
    res.json(x)
 })




app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});