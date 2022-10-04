////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Pie = require("../models/pie")

////////////////////////////////////////
// Creat Routes
////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////


// index route
// get request
  router.get("/", (req, res)=> {
    Pie.find({})
        .then(pies => {
            res.json({pies: pies})
        })
        .catch(err => console.log(err))
})

// post / create request
router.post("/", (req, res) => {
  
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
router.get("/:id", (req, res) => {
    const id = req.params.id
    Pie.findById(id)
    .then(pie => {
        res.json({pie: pie})
        console.log("I didn't break")
    })
    // send error as json
      .catch((error) => console.log(err))

    })

// put / updaterequest
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Pie.findByIdAndRemove(id)
      .then((pie) => {
        res.sendStatus(204)
      })
      .catch(err => res.json(err))
  })


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router