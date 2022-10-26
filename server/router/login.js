const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");

// router.get('/', (req, res) => {
//     res.send("Hello World")
// })

router.post("/api/login", (req, res)=> {
    const {number, location} = req.body;
    if(!number){
        return res.status(422).json({error: "Please add all the fields"})
    }
    User.findOne({number: number})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "User already exists with that number"})
        }
        const user = new User({
            number,
            location
        })
        user.save()
        .then(user => {
            res.status(201).json({message: "Saved successfully"})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router