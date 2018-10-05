/*
  Module dependencies
*/
const express = require('express');
const api = require('./routes/api');

/*
  Create Express server
*/
const app = express();

/*
  Set up routes
*/
api(app);

/*
  Express configuration
*/
app.set("port", process.env.PORT || 5000);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assests
  // like our main.js file, or main.css file.
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
  Start Express server
*/
app.listen(app.get("port"), () => {
  console.log("Launching server 🚀💫");
  console.log("Server is running at http://localhost:%d", app.get("port"));
});
