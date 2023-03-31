/**
 *  This file defines the routes for the explore section of the application.
    It contains the implementation for the following routes:
    POST /search: Handles a search request from the user and returns search results
    GET /explore-latest: Retrieves the latest posts from the database and renders them on the explore page
    GET /explore-random: Retrieves a random set of posts from the database and renders them on the explore page
    Each route sends the appropriate data to the corresponding view for rendering.
 * 
 */
require('../models/database');
const crypto = require('crypto');
const Category = require('../models/Category');
const Blog = require('../models/Blog');
/**
 * POST /search
 * Search 
*/
exports.searchBlog = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let blog = await Blog.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Blog - Search', blog } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
    
  }
  
  /**
   * GET /explore-latest
   * Explplore Latest 
  */
  exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const blog = await Blog.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'Blog -Latest', blog } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  } 
  
  /**
   * GET /explore-random
   * Explore Random as JSON
  */
  exports.exploreRandom = async(req, res) => {
    try {
      let count = await Blog.find().countDocuments();
      let random = crypto.randomInt(0,count-1);
      let blog = await Blog.findOne().skip(random).exec();
      res.render('explore-random', { title: 'Blog - Random', blog } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  } 

/**
 * GET /contact-us
 * Contact Us
*/
exports.contactUs = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('contact-us', { infoErrorsObj, infoSubmitObj  } );
}

  
/**
 * GET /about-us
 * About Us
*/
exports.aboutUs = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('about-us', { infoErrorsObj, infoSubmitObj  } );
}

/**
 * GET /template
 * template
*/
exports.makeTemplate = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('template', { infoErrorsObj, infoSubmitObj  } );
}


  