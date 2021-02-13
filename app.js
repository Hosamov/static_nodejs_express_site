const express = require('express');
const { projects } = require('./data'); //serve data.json as an object
const path = require('path'); //path module for setting absolute path in express.static function

const app = express();

//view engine Setup
app.set('views', path.join(__dirname, 'views')); //folder with pug templates
app.set('view engine', 'pug'); //set view engine to pug

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

//function to handle error creation and logging
function errorHandler(status, message) {
  //Create a new the error class object
  const err = new Error()
  err.message = message;
  err.status = status;

  //log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  return err;
}

//index route
app.get('/', (req, res, next) => {
  res.render('index', { projects });
});

//about page route
app.get('/about', (req, res, next) => {
  res.render('about');
});

//custom error handler for 500 Server error
app.get('/error', (req, res, next) => {
  const err = errorHandler(500, 'There appears to be a problem with the server.');
  next(err);
});

//projects route
app.get('/projects/:id', (req, res, next) => { //route parameter is :id
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

//404 error handler
app.use((req, res, next) => {
  const err = errorHandler(404, `It appears the page you requested doesn't exist.`);
  res.status(404).render('page-not-found'); //display a generic 404 page without error stack
});

//global error handler
app.use((err, req, res, next) => {
  if(err) {
    if(err.status === 404) {
      //console.log('404 error handler called');
       res.status(404).render('page-not-found', { err }); //render the error status with the error stack
    } else {
      err.message = err.message; //|| "Oops, it looks like something went wrong on the server...";
      res.status(err.status || 500).render('error', { err }); //display the error status and render the error template w/ error message/object
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
