const express = require('express');
const { projects } = require('./data'); //serve data.json as an object
const path = require('path'); //path module for setting absolute path in express.static function

const app = express();

//view engine Setup
app.set('views', path.join(__dirname, 'views')); //folder with pug templates
app.set('view engine', 'pug'); //set view engine to pug

//setup static middleware
app.use('/static', express.static('public')); //target public folder as '/static'

//function to handle error creation and logging
function errorHandler(status, message) {
  const err = new Error()
  err.message = message;
  err.status = status;

  //log out the error code, message, and stack in the console
  console.log('Error status code: ' + err.status);
  //console.log(err.message);
  console.log(err.stack);

  return err;
}

app.get('/', (req, res, next) => {
  res.render('index', { projects });
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

//custom error handler for 500 Server error
app.get('/error', (req, res, next) => {
  //console.log('Custom error route called');
  const err = errorHandler(500, 'There appears to be a problem with the server.');
  next(err);
});

app.get('/projects/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );

  if(project) {
    res.render('project', { project });
  } else {
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
