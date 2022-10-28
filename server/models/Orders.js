const mongoose = require("mongoose")

const OrdersSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TOOL",
            required: true
        }
    },
    { timestamps: true }
)

const Orders = mongoose.model("ORDERS", OrdersSchema)

module.exports = Orders