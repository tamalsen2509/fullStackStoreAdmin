
require('dotenv').config();
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let db = require('./db/connection');
let methodOverride = require('method-override');
//let hbs = exphbs.create()


// views for template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// method override middleware
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
app.use('/', require('./routes/index'));
app.use('/electronics', require('./routes/electronics'))




module.exports = app;