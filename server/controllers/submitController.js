/**

  This file defines the routes for submitting a blog post.
  It contains the implementation for the following routes:
  GET /submit-blog: Renders the form for submitting a new blog post
  POST /submit-blog: Handles the submission of a new blog post form data
  The GET route simply renders the form for submitting a new blog post.
  The POST route handles the form data submission and validates the input.
  If the input is valid, the new blog post is saved to the database and the user is redirected to the home page.
  If the input is not valid, an error message is displayed to the user and they are prompted to fix the errors and resubmit the form.
*/
require('../models/database');
const Category = require('../models/Category');
const Blog = require('../models/Blog');
/**
 * GET /submit-blog
 * Submit Blog
*/
exports.submitBlog = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-blog', { title: 'Blog', infoErrorsObj, infoSubmitObj  } );
  }
  

    /**
   * POST /submit-blog
   * Submit Blog
  */
  exports.submitBlogOnPost = async(req, res) => {
    try {
  
      var imageUploadFile;
      var uploadPath;
      var newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
        })
  
      }
  
      const newRecipe = new Blog({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Blog submitted...')
      res.redirect('/');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/');
    }
  }
  