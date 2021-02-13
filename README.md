# Static Node.js and Express Site
A portfolio web application using Node.js, Express.js, and Pug to showcase the projects I've created.

### DETAILS
#### Initialization
- node_modules folder is referenced in .git_ignore.
- 'npm install' downloads all necessary dependencies
-  Running 'node app.js' serves the application

#### Data
- data.json contains a projects property set to an array containing a list of objects that contain the following properties:
  - id
  - project_name
  - description
  - technologies
  - live_link
  - github_link
  - image_urls

#### Routes
- The following routes are rendered:
  - '/' - Home page
  - '/about' - About page
  - '/projects/:id' - Project page w/ appropriate id (0-5)
  - '/error'  - custom error route (to test the custom 500 error)
- Uses a /static route to serve the static files in the public folder
  - css
  - images
  - js

#### Templates
- Uses the following base templates:
  - layout.pug - basic HTML layout for the application
  - index.pug - for '/' (home) route
  - about.pug - for '/about' route
  - project.pug - for '/projects/:id' route
- Templates contain the following data, served by data.json:
  - name
  - project titles
  - project descriptions
  - project descriptions
  - project images
  - project links

#### Errors
- The application logs out a user friendly error message to the console when the app is pointed at undefined routes, such as '/noroute' and 'projects/noroute'
  - Logs to console:
    - error status
    - error message
    - error stack

#### Layout, CSS and Styles
- Style, layout, and positioning matches the included mockup files

### EXTRA FUNCTIONALITY
- 'npm start' functionality:
  - Running 'npm start' serves the app
- Pug Error Templates:
  - error template renders user-friendly 500 or other status errors (not including error 404)
    - Test: '/error'
  - page-not-found template renders user-friendly 404 errors
    - Test: '/noroute'
    - Test: '/projects/noroute'
  - Both templates render the error status, error message, and error stack (only if in the '/projects:id' route)
- Styling
  - Font
    - All fonts set to 'Lato' and 'Helvetica Neue'
  - Colors
    - Color Scheme:
      - #eaeaea - used as background color of the sidebar
      - #fefefe - used as the main body background color
      - #000 - Used as darkest text color
      - #999 - Used as lightest text Color & box shadow color
  - Box Shadows
    - Added box shadows to project cells #999
  - Animations
   - Added a pulse effect/animation to the 'learn more' and 'back' links
   - Added scale up and scale down animations for when hovering over the project cells


#### Last Update 2/13/2021
