const mongoose = require("mongoose")
const gallery = new mongoose.Schema({
    imagename:{
        type: String,
        required: true
    },
    eventname:{
        type: String
    },
    eventDescription:
    {
        type: String
    },
    createdAt: 
    {
        type: Date,
        immutable: true,
        default: () =>Date.now()
    },
    updatedAt:
    {
        type: Date,
        default: () => Date.now()

    }
  });

gallery.pre('save', function(next){
    this.updatedAt = Date.now()
    next()
})



module.exports = mongoose.model("Gallery", gallery);