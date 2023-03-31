//to import the Mongoose library and stores it in the mongoose variable for use in the code.
const mongoose = require('mongoose'); 

// establishes the database connection that the rest of the code relies on.
mongoose.connect('mongodb://0.0.0.0/blog-website');

// This variable can be used to interact with the database.
const db = mongoose.connection;
// event listener for when the connection to the MongoDB server is successfully opened. Once the connection is open, it logs a message to the console.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./Category');
require('./Blog');