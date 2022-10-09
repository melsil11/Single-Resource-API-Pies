////////////////////////////////////////////////
// Our Schema and Models for our pie resource
/////////////////////////////////////////////
// new import
const mongoose = require("./connection")
const User = require('./user')

// here we'll import our commentSchema
const commentSchema = require('./comment')
// pull schema and model from mongoose
const { Schema, model } = mongoose

// make pie schema
const piesSchema = new Schema({
  name: String,
  fruit: Boolean,
  grahamCrackerCrust: Boolean,
  owner: {
    // here we can refer to an objectId
    // by declaring that as the type
    type: Schema.Types.ObjectId,
    // this line, tells us to refer to the User model
    ref: 'User'
},
comments: [commentSchema]
}, { timestamps: true })


// make pie model
const Pie = model("Pie", piesSchema)

// Export Model
module.exports = Pie
