const express = require('express');
const { projects } = require('./data'); //serve data.json as an object
const path = require('path'); //path module for setting absolute path in express.static function

let indexRouter = require('./routes/index');  //import the index route in routes/index.js

const app = express();

//view engine Setup
app.set('views', path.join(__dirname, 'views')); //folder with pug templates
app.set('view engine', 'pug'); //set view engine to pug

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

app.use('/', indexRouter); //route to routes/index.js

//404 error handler
app.use((req, res, next) => {
  //Create a new the error class object
  const err = new Error()
  err.message = `It appears the page you requested doesn't exist.`;
  err.status = 404;

  //log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  //render the page-not-found template
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000...');
});

module.exports = app; //export the module as 'app'
