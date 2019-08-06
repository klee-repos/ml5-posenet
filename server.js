require('dotenv').config();
const PORT = 4058

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// express
const app = express();
const server = require('http').createServer(app);

// body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// load public
app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

server.listen(process.env.PORT || PORT, function() {
  console.log(`Node server started on port ${PORT}`)
});