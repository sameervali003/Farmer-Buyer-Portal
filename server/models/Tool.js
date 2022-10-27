const mongoose = require("mongoose")

const ToolSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        file: {
            data: Buffer,
            contentType: String,
        },
        sold: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const Tool = mongoose.model("TOOL", ToolSchema)

module.exports = Tool