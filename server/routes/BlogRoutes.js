/**

    This file defines the routes for the blog application using the Express router.
    It imports the necessary controllers to handle the logic for each route.
    The routes defined in this file are:
    GET /: Renders the home page of the blog
    GET /blog/:id: Renders the full blog post for a specific post id
    GET /categories: Renders the categories page with a list of all categories
    GET /categories/:id: Renders the posts page for a specific category
    Additionally, this file defines the routes for the "explore" and "submit blog" functionalities of the application.
    The submit blog routes allow users to submit a new blog post by rendering the form and handling form data submission.
    Each route is associated with a corresponding controller method to handle the logic and rendering of the view.
    The router module is exported to be used in the main application file.
*/
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const submitController = require('../controllers/submitController');
const exploreController = require('../controllers/exploreController');

/**
 * App Routes 
*/
router.get('/', blogController.homepage);
router.get('/blog/:id', blogController.exploreBlog );
router.get('/categories', blogController.exploreCategories);
router.get('/categories/:id', blogController.exploreCategoriesById);

//explore routes
router.post('/search', exploreController.searchBlog);
router.get('/explore-latest', exploreController.exploreLatest);
router.get('/explore-random', exploreController.exploreRandom);

//submit blog routes
router.get('/submit-blog', submitController.submitBlog);
router.post('/submit-blog', submitController.submitBlogOnPost);

//contact us

router.get('/contact-us',exploreController.contactUs);

//about-us
router.get('/about-us',exploreController.aboutUs);

//template
router.get('/template',exploreController.makeTemplate);

module.exports = router;