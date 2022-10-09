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
          const username = req.session.username
          const loggedIn = req.session.loggedIn
          const userId = req.session.userId
          res.render('pies/index', { pies, username, loggedIn, userId })
          // res.json({ pies: pies })
        })
        // .catch(err => console.log(err))
        .catch(err => res.redirect(`/error?error=${err}`))
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
   // we'll add the owner to the pie from the request body.
  // Since we've stored the id of the user in the session object, 
  // we can use it to set the owner property of the pie upon creation.
  req.body.fruit = req.body.fruit ==='on'? true : false
  req.body.grahamCrackerCrust = req.body.grahamCrackerCrust ==='on'? true : false
  req.body.owner = req.session.userId
  console.log('the pie from the form', req.body)
    
    Pie.create(req.body)
      .then((pie) => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId  
        res.redirect('/pies')
        // res.status(201).json({ pie: pie.toObject() })
      })
      .catch(err => res.redirect(`/error?error=${err}`))     
      // .catch((error) => {
      //   console.log(error)
      //   res.json({ error })
      // })
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
      // .catch(err => console.log(err))
      .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request
// only pies owned by logged in user
// we're going to build another route, that is owner specific,
//  to list all the pies owned by a certain(logged in) user
router.get('/mine', (req, res) => {
  // find the piess, by ownership
  Pie.find({ owner: req.session.userId })
  // then display the piess
  .then(pies => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    // res.status(200).json({ pies: pies })
    res.render('pies/index', { pies, username, loggedIn, userId })
})
  // or throw an error if there is one
      // .catch(error => res.json(error))
      .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/:id/edit", (req, res) => {
  const username = req.session.username
  const loggedIn = req.session.loggedIn
  const userId = req.session.userId
  // we need to get the id
	const pieId = req.params.id
	// find the pie
	Pie.findById(pieId)
		// -->render if there is a pie
		.then((pie) => {
			// console.log('edit pie', pie)
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			res.render('pies/edit', { pie, username, loggedIn })
		})
		// -->error if no pie
		.catch((err) => {
			// console.log(err)
			// res.json(err)
      res.redirect(`/error?error=${err}`)
		})
})


// put / update request
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id
    req.body.fruit = req.body.fruit ==='on'? true : false
    req.body.grahamCrackerCrust = req.body.grahamCrackerCrust ==='on'? true : false
    console.log('req.body after changing checkbox value', req.body)
    Pie.findById(id)
      .then((pie) => {
        if (pie.owner == req.session.userId) {
          // res.sendStatus(204)
          return pie.updateOne(req.body)
      } else {
          res.sendStatus(401)
      }
  })
     .then(() => {
    // console.log('returned from update promise', data)
      res.redirect(`/pies/${id}`)
})
  // .catch(error => res.json(error))
    .catch(err => res.redirect(`/error?error=${err}`))
})


// Delete request  
router.delete("/:id", (req, res) => {
    const pieid = req.params.id
    Pie.findByIdAndRemove(pieId)
      .then((pie) => {
        // if the delete is successful, send the user back to the index page
        res.redirect('/pies')
      })
      .catch(error => {
          // res.json({ error })
          res.redirect(`/error?error=${err}`)
      })
})
        // if (pie.owner == req.session.userId) {
          // if successful, send a status and delete the pie
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