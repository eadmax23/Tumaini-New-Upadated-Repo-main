const mongoose = require("mongoose")
const admin = new mongoose.Schema({
    username:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    role:
    {
        type: String,
        default: "Admin"
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


admin.pre('save', function(next){
    this.updatedAt = Date.now()
    next()
})


module.exports = mongoose.model("Administator", admin);


