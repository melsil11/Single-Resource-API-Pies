/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const Pie = require("./pie")

///////////////////////////////////////
// Seed Script code
/////////////////////////////////////
// first we need our connections saved to a variable for easy reference
const db = mongoose.connection
// bring in the array of starter pies
db.on("open", ()=> {
const startPies = [
      { name: "Apple", fruit: true, grahamCrackerCrust: false },
      { name: "Chicken", fruit: false, grahamCrackerCrust: false},
      { name: "Banana cream", fruit: true, grahamCrackerCrust: true },
      { name: "Turkey", fruit: false, grahamCrackerCrust: false},
      { name: "Blueberry", fruit: true, grahamCrackerCrust: false },
    ]

    // delete all pie  
    Pie.deleteMany({})
        .then((deletedPies) => {
            console.log('this is what .deleteMany returns', deletedPies)
            Pie.create(startPies)
                .then((data) => {
                    console.log('Here are the new seed pies', data)
                    db.close()
        })

        .catch(error => {
            console.log(error)
            // always close the connection to the db
            db.close()
        })
    })
        .catch(error => {
            console.log(error)
            // always close the connection to the db
            db.close()
    })

})

   