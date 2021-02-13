const express = require('express');
const router = express.Router();
const { projects } = require('../data'); //serve data.json as an object

//index route
router.get('/', (req, res, next) => {
  res.render('index', { projects });
});

//about page route
router.get('/about', (req, res, next) => {
  res.render('about');
});

//custom error handler for 500 Server error
router.get('/error', (req, res, next) => {
  const err = errorHandler(500, 'There appears to be a problem with the server.');
  next(err);
});

//projects route
router.get('/projects/:id', (req, res, next) => { //route parameter is :id
  const projectId = req.params.id; //target route parameter of :id
  const project = projects.find( ({ id }) => id === +projectId ); //search id within data.json and see if there's a match with what was requested

  if(project) { //if all is well, display the correct page for what was requested by the user...
    res.render('project', { project });
  } else {
    //if the project id doesn't exist, return a 404 error
    const err = errorHandler(404, `It appears the page you requested doesn't exist.`);
    next(err);
  }
});

module.exports = router; //export the module as 'router'
