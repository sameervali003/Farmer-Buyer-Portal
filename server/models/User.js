const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true
        },
        state: {
            type: String
        },
        city: {
            type: String
        }
    },
    { timestamps: true }
)

const User = mongoose.model("USER", UserSchema)

module.exports = User