// dependencies //
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 
const app = express()


// import models
const Pie = require('./models/pie')

// db connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))


// middleware
app.use(morgan("tiny")) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public"))
app.use(express.json())

// routes
app.get("/", (req, res) => {
    res.send("I love Pie!!!.")
  })
  app.get("/pies/seed", (req, res) => {
    // array of starter fruits
    const startPies = [
      { name: "Apple", fruit: true, grahamCrackerCrust: false },
      { name: "Chicken", fruit: false, grahamCrackerCrust: false},
      { name: "Banana cream", fruit: true, grahamCrackerCrust: true },
      { name: "Turkey", fruit: false, grahamCrackerCrust: false},
      { name: "Blueberry", fruit: true, grahamCrackerCrust: false },
    ]
// delete all pie  
    Pie.deleteMany({})
        .then(() => {
      Pie.create(startPies)
        .then((data) => {
          res.json(data)
        })
    })
  })


// get request
  app.get("/pies", (req, res)=> {
    Pie.find({})
        .then(pies => {
            res.json({pies: pies})
        })
        .catch(err => console.log(err))
})

// post request
app.post("/pies", (req, res) => {
  
    Pie.create(req.body)
      .then((pie) => {

        res.status(201).json({ pie: pie.toObject() })
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })

// show request
app.get("/pies/:id", (req, res) => {
    const id = req.params.id
    Pie.findById(id)
    .then(pie => {
        res.json({pie: pie})
        console.log("I didn't break")
    })
    // send error as json
      .catch((error) => console.log(err))

    })

// put request
app.put("/pies/:id", (req, res) => {
    const id = req.params.id
   
    Pie.findByIdAndUpdate(id, req.body, { new: true })
      .then((pie) => {
        res.sendStatus(204)
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })

// Delete request  
app.delete("/pies/:id", (req, res) => {
    const id = req.params.id
    Pie.findByIdAndRemove(id)
      .then((pie) => {
        res.sendStatus(204)
      })
      .catch(err => res.json(err))
  })


// server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))