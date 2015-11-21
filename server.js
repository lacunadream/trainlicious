var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var pg = require('pg');
 
 var app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

// Postgre

var conString = "postgres://oxbqavxj:dx6CgdjYT_IVp2YvxXzLJM_uX7yMOY9x@horton.elephantsql.com:5432/oxbqavxj";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM weather', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
});





// Routes
app.get('/', function(req, res) {
    res.json({ message: 'eff off' });   
});

 app.get('/api/query', function (req, res) {
    var dest = req.query.dest;
    var dept = req.query.dept;
    var time = req.query.time;

    var result = Math.random() * 10

    var x = {"Crowd Score":result, 
    	"Departure":dept, 
    	"Destination":dest, 
    	"Time":time};
    console.log(x);
    res.json(x);
 })




app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});