let express = require('express');
let route = express.Router();
let moment = require('moment');


// get form to add customer
route.get('/', (req, res) => {
    let date = moment(Date.now()).format('MMMM Do YYYY')
    
    res.render('home' , {date : date})
})


module.exports = route;