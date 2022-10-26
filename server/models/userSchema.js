const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    location: {
        type: String
    }
})

const User = mongoose.model("USER", userSchema)

module.exports = User