const express = require("express");
const router = express.Router();

const User = require("../models/User");

// add new user
router.post("/api/user", (req, res)=> {
    const {number} = req.body;
    if(!number){
        return res.status(422).json({error: "Please add all the fields"})
    }
    User.findOne({number: number})
    .then((savedUser) => {
        if(savedUser){
            console.log(savedUser)
            return res.status(422).json({error: "User already exists with that number"})
        }
        const user = new User({
            number
        })
        user.save()
        .then(user => {
            return res.status(201).json({message: "Saved successfully"})
        })
        .catch(err => {
            return res.status(500).json({error: err})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// get user info
router.get("/api/user", (req, res)=> {
    User.findOne(req.query).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "User doesn't exist" })
        }
        return res.status(200).json({savedUser})
    })
})

// update user info
router.put("/api/user", async (req, res)=> {
    const { number, state, city } = req.body
    if (!number || !state || !city) {
        return res.status(422).json({error: "Please add all the fields"})
    }

    const filter = { number }
    const update = { state, city }
    try {
        let doc = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        console.log(doc)
        return res.status(201).json(doc)
    } catch (e) {
        return res.status(500).json({error: e})
    }
})

module.exports = router