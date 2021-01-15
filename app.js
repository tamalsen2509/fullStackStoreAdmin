
require('dotenv').config();
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let db = require('./db/connection');
let methodOverride = require('method-override');
let helmet = require('helmet');

//Handlebars helper method

let formatDate = require('./helper/helper')


// views for template engine
app.engine('handlebars', exphbs({helpers : formatDate}));
app.set('view engine', 'handlebars');


// basic security
//app.use(helmet());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// method override middleware
//Ref:   https://www.npmjs.com/package/method-override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))


// db connection 
db.connection();

// static / public middleware 
app.use(express.static('public'))

// routes 
app.use('/', require('./routes/index')); // index routes 
app.use('/electronics', require('./routes/electronics')) // routes for electroics
app.use('/toys', require('./routes/toyStore')) // route for toy store




module.exports = app;