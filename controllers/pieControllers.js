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
    .populate("comments.author", "username")
        .then(pies => {
          res.render('pies/index', { pies })
          // res.json({ pies: pies })
        })
        .catch(err => console.log(err))
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
  const username = req.session.username
  const loggedIn = req.session.loggedIn
  const userId = req.session.userId
  res.render('pies/new', { username, loggedIn, userId })
})
        

// post / create request
router.post("/", (req, res) => {
   // we'll add the owner to the fruit from the request body.
  // Since we've stored the id of the user in the session object, 
  // we can use it to set the owner property of the fruit upon creation.
  req.body.fruit = req.body.fruit ==='on'? true : false
  req.body.grahamCrackerCrust = req.body.grahamCrackerCrust ==='on'? true : false
  req.body.owner = req.session.userId
  // console.log('this is req.body before adding owner', req.body)
    
    Pie.create(req.body)
      .then((pie) => {
        res.redirect('/pies')
        // res.status(201).json({ pie: pie.toObject() })
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
        // populate will provide more data about the document that is in the specified collection
      // the first arg is the field to populate
      // the second can specify which parts to keep or which to remove
      // .populate("owner", "username")
      // we can also populate fields of our subdocuments
      .populate("comments.author", "username")
      .then(pie => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
       
        res.render('pies/show', { pie, username, loggedIn, userId })
          // res.json({ pie: pie })
      })
      .catch(err => console.log(err))
})

// GET request
// only fruits owned by logged in user
// we're going to build another route, that is owner specific,
//  to list all the fruits owned by a certain(logged in) user
router.get('/mine', (req, res) => {
  // find the fruits, by ownership
  Pie.find({ owner: req.session.userId })
  // then display the fruits
      .then(pies => {
          res.status(200).json({ pies: pies })
      })
  // or throw an error if there is one
      .catch(error => res.json(error))
})

// GET request to show the update page
router.get("/:id/edit", (req, res) => {
  // we need to get the id
	const pieId = req.params.id
	// find the pie
	Pie.findById(pieId)
		// -->render if there is a fruit
		.then((pie) => {
			console.log('edit pie', pie)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('pies/edit', { pie, username, loggedIn })
		})
		// -->error if no pie
		.catch((err) => {
			console.log(err)
			res.json(err)
		})
})


// put / updaterequest
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.fruit = req.body.fruit ==='on'? true : false
    req.body.grahamCrackerCrust = req.body.grahamCrackerCrust ==='on'? true : false
    Pie.findById(id)
      .then((pie) => {

        if (pie.owner == req.session.userId) {
          res.sendStatus(204)
          return pie.updateOne(req.body)
      } else {
          res.sendStatus(401)
      }
  })
  .catch(error => res.json(error))
})

// Delete request  
router.delete("/:id", (req, res) => {
    const pieid = req.params.id
    Pie.findByIdAndRemove(pieid)
      .then((pie) => {
        // if the delete is successful, send the user back to the index page
        res.redirect('/pies')
      })
      .catch(error => {
          res.json({ error })
      })
})
        // if (pie.owner == req.session.userId) {
          // if successful, send a status and delete the fruit
          // res.sendStatus(204)
          // return pie.deleteOne()
      // } else {
          // if they are not the user, send the unauthorized status
          // res.sendStatus(401)
//       }
// })
// send the error if not
// .catch(err => res.json(err))
// })


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router