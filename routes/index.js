let express = require('express');
let route = express.Router();



// get form to add customer
route.get('/', (req, res) => {
    res.render('home')
})


module.exports = route;