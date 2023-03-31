// This file defines the Category schema for our MongoDB database using Mongoose.
// It exports a Category model that can be used to interact with the "categories" collection.
// The schema has two required fields: "name" and "image".
// "name" is a string representing the name of the category.
// "image" is a string representing the URL of the image associated with the category.

// Importing mongoose module for MongoDB database connection

const mongoose = require('mongoose');

// Defining schema for the 'categories' collection
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

// Exporting the model for the 'categories' collection

module.exports = mongoose.model('Category', categorySchema);