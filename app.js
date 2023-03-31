/**

  This file sets up the main server for the blog application using the Express framework.
  It imports and configures various middleware and sets up the routes for the application.
  The middleware used in this file includes:
  express.urlencoded: Parses incoming request bodies in a urlencoded format and exposes them on req.body
  express.static: Serves static files such as images, CSS, and JavaScript files from the 'public' directory
  expressLayouts: Provides layout support for EJS templates
  cookieParser: Parses cookies attached to the client request object
  express-session: Provides session middleware to store session data on the server
  connect-flash: Stores and retrieves flash messages from session data for one-time display
  express-fileupload: Provides middleware for handling file uploads
  The server is configured to listen on the port specified by the environment variable PORT or on port 3000 by default.
  This file also sets the view engine to EJS and configures the main layout file for the views.
  Finally, it sets up the application routes by importing the BlogRoutes module and using it with the Express app.
  The server is started by calling the listen() method and logging a message to the console when it starts listening.
  */



const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
app.disable('x-powered-by');

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

//code for session management
const secret =  process.env.BLOG_APP_SECRET_SESSION;

app.use(cookieParser('BlogAppSecure'));
app.use(session({
  secret: secret,
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/BlogRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));