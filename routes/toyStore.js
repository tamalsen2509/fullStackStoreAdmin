let express = require('express');
let route = express.Router();


route.get('/', (req, res) => {
    res.send("configuration is already in progress; please contact: tamal.sen@hotmail.com" )   
})







module.exports = route; 