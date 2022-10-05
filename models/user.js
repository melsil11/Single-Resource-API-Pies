//////////////////////////////////////////////
// User resources (schema and model)
//////////////////////////////////////////////

//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require('./connection')

////////////////////////////////////////////////
// Define our user schema and Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose

// make pies schema
const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
    },
  password: { 
    type: String, 
    required: true 
    },
})

// make pie model
const User = model('User', userSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User