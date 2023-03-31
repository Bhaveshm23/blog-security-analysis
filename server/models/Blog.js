/*
  This code snippet defines the Mongoose schema for a blog post, including the fields 'name', 'description', 'email', 'category', 'image', and 'createdAt'. Each field has its own type and is marked as required. The 'category' field is restricted to one of five possible values using the 'enum' property.
*/
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Lifestyle', 'Food', 'Travel', 'Education', 'Newsletter'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
  createdAt:{
    type:Date,
    default: Date.now 
},

});

blogSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Blog', blogSchema);