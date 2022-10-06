/////////////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const morgan = require('morgan') // import morgan - its a request logger
const express = require('express') // import express
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')

/////////////////////////////////////////////////////
// Middleware function
/////////////////////////////////////////////////////
const middleware = (app)=> {
    app.use(methodOverride('_method'))
    app.use(morgan('tiny')) //logging - this is for request logging. 
    // The 'tiny' argument declares what size of morgan to use
    app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
    // this parses urlEncoded request bodies, (useful for POST and PUT requests)
    app.use(express.static('public')) // serve files from public folder statically
    app.use(express.json()) // parses incoming requests with JSON payloads
    // we need to set up a session function and pass that function an object 
    // as the argument, that argument object will tell express session how to build 
    // our session
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUnitialized: true,
            resave: false
        })
    )
}

/////////////////////////////////////////////////////
// Middleware function
/////////////////////////////////////////////////////
module.exports = middleware