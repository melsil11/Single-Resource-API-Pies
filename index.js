/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() 
const express = require("express") 
// const morgan = require("morgan") 
const path = require("path") 
const PieRouter = require("./controllers/pieControllers")
const UserRouter = require("./controllers/userControllers")
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware.js')
/////////////////////////////////////////////
// Create our Express Application code
/////////////////////////////////////////////
const app = require('liquid-express-views')(express())

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
// our middleware is now being passed through a function in the utils directory
// the middleware function takes one argument, an app, and processes the 
// middleware on that argument(which is our app)
// middleware runs before all the routes, every request is processed through our 
// middleware before mongoose does anything with it. 
middleware(app)

////////////////////////////////////////////
// Home Routes
////////////////////////////////////////////
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/pies')
    } else{

      res.render('index.liquid')

    }

})

///////////////////////////////////////////
// Register our Routes
////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to 
// send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs to arguments
// the first, is the base url endoint, the second is the file to use
app.use('/pies', PieRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

app.get('/error', (req, res) =>{
  // get session variables
  const { username, loggedIn, userId} = req.session
  const error = req.query.error || "this page does not exist"

  res.render('error.liquid', { error, username, loggedIn, userId})
})
// this is a catchall routte, that will redirect to the error page for anything that doesn't sat
app.all('*', (req, res) =>{
  res.redirect('/error')
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))