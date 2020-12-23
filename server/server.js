const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const imageRouter = require('./routes/image.router');
const linkRouter = require('./routes/link.router');

//for handling data from requests and pointing to static folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('build'));

//routes for data gathering
app.use('/api/images', imageRouter);
app.use('/api/links', linkRouter);

//starting the server
app.listen(PORT);
console.log('Running on port: ', PORT);
