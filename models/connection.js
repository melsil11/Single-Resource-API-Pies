/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
require('dotenv').config() 
const mongoose = require('mongoose') 

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const DEPLOYED_URL = process.env.DEPLOYED_URL

const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish our Connection
mongoose.connect(DEPLOYED_URL, CONFIG)


// Events for when connection opens/disconnects/errors
mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (error) => console.log('An error occured: \n', error))

  /////////////////////////////////////////////
// Export our Connection
/////////////////////////////////////////////
module.exports = mongoose 