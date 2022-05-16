const mongoose = require("mongoose")





const newsSchema = new mongoose.Schema({
    partcipants:
    {
        type: String
    },
    contact:
    {
        type: String
    },
    time:
    {
        type: String
    },
    category:
    {
        type: String,
        required: true
    },
    content:
    {
        type: String,
        required: true
    },
    location:
    {
        type: String,
        required: true
    },
    snippet:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
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
}
)


newsSchema.pre('save', function(next)
{
    this.updatedAt = () => Date.now()
    next();
})


module.exports = mongoose.model('News', newsSchema)