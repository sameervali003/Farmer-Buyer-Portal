const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");

router.get("/api/location", (req, res)=> {
    const { number } = req.query
    if (!number) {
        return res.status(422).json({ error: "Please specify a number" })
    }
    User.findOne({ number: number }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "User doesn't exist" })
        }
        return res.status(200).json({ city: savedUser.city, state: savedUser.state })
    })
})

router.post("/api/location", async (req, res)=> {
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