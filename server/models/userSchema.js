const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    }
})

const User = mongoose.model("USER", userSchema)

module.exports = User