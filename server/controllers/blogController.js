/**
 * This file defines the routes for the blog application.
  It contains the implementation for the following routes:
  GET /: Renders the home page of the blog
  GET /categories: Renders the categories page with a list of all categories
  GET /categories/:id: Renders the posts page for a specific category
  GET /blog/:id: Renders the full blog post for a specific post id
  Each route sends the appropriate data to the corresponding view for rendering.
 * 
 */
require('../models/database');
const Category = require('../models/Category');
const Blog = require('../models/Blog');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Blog.find({}).sort({_id: -1}).limit(limitNumber);
    const lifestyle = await Blog.find({ 'category': 'Lifestyle' }).limit(limitNumber);
    const education = await Blog.find({ 'category': 'Education' }).limit(limitNumber);
    const travel = await Blog.find({ 'category': 'Travel' }).limit(limitNumber);

    const blogCategories = { latest, lifestyle, education, travel };

    res.render('index', { title: 'Blog - Home', categories, blogCategories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    console.log(categories);
    res.render('categories', { title: 'Blog - Categoreis', categories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Blog.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Blog - Categories', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /blog/:id
 * Blog 
*/
exports.exploreBlog = async(req, res) => {
  try {
    let blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    res.render('blog', { title: 'Blog - Types', blog } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


