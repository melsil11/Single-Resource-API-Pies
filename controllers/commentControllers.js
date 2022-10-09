////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Pie = require("../models/pie")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:pieId", (req, res) => {
    const pieId = req.params.pieId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific pie
    Pie.findById(pieId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the pie?
        .then(pie => {
            // push the comment into the pie.comments array
            pie.comments.push(req.body)
            // we need to save the pie
            return pie.save()
        })
        .then(pie => {
            // res.status(200).json({ pie: pie })
            // res.render("/:id")
            res.redirect(`/pies/${pie.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        // .catch(error => console.log(error))
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:pieId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const pieId = req.params.pieId 
    const commId = req.params.commId
    // get the pie
    Pie.findById(pieId)
        .then(pie => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theComment = pie.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    // find some way to remove the comment
                    // here's another built in method
                    theComment.remove()
                    pie.save()
                    res.redirect(`/pies/${pie.id}`)
                    // res.sendStatus(204)
                    // return the saved pie
                    // return pie.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router