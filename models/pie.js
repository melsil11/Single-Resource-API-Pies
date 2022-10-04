////////////////////////////////////////////////
// Our Schema and Models for our fruit resource
/////////////////////////////////////////////
// new import
const mongoose = require("./connection")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make pie schema
const piesSchema = new Schema({
  name: String,
  fruit: Boolean,
  grahamCrackerCrust: Boolean,
})

// make pie model
const Pie = model("Pie", piesSchema)

// Export Model
module.exports = Pie
