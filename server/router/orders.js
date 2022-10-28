const express = require("express");
const router = express.Router();

const Orders = require("../models/Orders");
const Tool = require("../models/Tool");

// add new Order
router.post("/api/order", async (req, res) => {
    const { buyer, product } = req.body;
    if (!buyer || !product) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    const order = new Orders({
        buyer,
        product
    });
    try {
        let doc = await Tool.findOneAndUpdate({ _id: product }, { sold: true }, {
            new: true
        });
        console.log(doc)
        order.save().then((order) => {
            return res.status(201).json({ message: "Saved successfully" });
        }).catch((err) => {
            return res.status(500).json({ error: err, message: "Error in saving to db!!" });
        });
    } catch (e) {
        console.log(e)
    }
});

module.exports = router