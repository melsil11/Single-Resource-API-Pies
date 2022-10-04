/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const path = require("path") 
const PieRouter = require("./controllers/pieControllers")
const UserRouter = require("./controllers/userControllers")
const middleware = require('./utils/middleware.js')
/////////////////////////////////////////////
// Create our Express Application code
/////////////////////////////////////////////
const app = express()

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
  res.send('Your server is running... better go out and catch it.')
})

///////////////////////////////////////////
// Register our Routes
////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to 
// send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs to arguments
// the first, is the base url endoint, the second is the file to use
app.use('/pies', FruitRouter)
app.use('/users', UserRouter)

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))