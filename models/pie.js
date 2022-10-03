const mongoose = require("mongoose")

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
