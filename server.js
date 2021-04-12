const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
//returns express server application that's now available under variable app

app.use(morgan('dev'));
//inserts morgan middleware, dev configures morgan to log using the 
//development version, which prints additional information to the screen

app.use(express.json());
//an express middleware function: when the server receives requests with json 
//formatted data in the body, this middleware function will handle parsing that json data into js properties of the request object, so we can use that data in js

app.use('/campsites', campsiteRouter);
//because you provided the route path for the campsiteRouter here, this is why you don't need to specify in campsiteRouter.js 

app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));
//sets up express to serve files from the public folder
//__dirname is special variable which refers to the absolute path of the current directory of the file that it's in

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//creates an instance of the http server class and starts listening to it