// server js stand alone file to communicate with server.
let app = require('./app');
let port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log(`api is listening at ${port}`)
})