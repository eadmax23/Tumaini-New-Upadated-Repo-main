const mongoose = require("mongoose")

const infoShema = new mongoose.Schema(
    {
        firstname:
        {
            type: String,
            required: true
        },
        lastname:
        {
            type: String,
            required: true
        },
        title:
        {
            type: String,
            required: true
        },
        roles:
        {
            type: String
        },
        location:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        subjects:
        {
            type: String
        },
        pictureiD:
        {
            type: String
        },
        contact:
        {
            required: true,
            type: String
        },
        createdAt:
        {
            type: Date,
            immutable: true,
            default: () => Date.now()
        },
        updatedAt:
        {
            type: Date,
            default: () => Date.now()
        }
    })


infoShema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})



module.exports = mongoose.model("StaffsInfo", infoShema)