const mongoose = require('mongoose')

const statiscticsSchema = new mongoose.Schema(
    {
        noSupporter:
        {
            type: Number,
            required: true
        },
        noWorkers: 
        {
            type: Number,
            required: true
        },
        noStaffs:
        {
            type: Number,
            required: true
        },
        noStudents:
        {
            type: Number,
            required: true
        },
        createdAt:
        {
            type: Date,
            immutable: true,
            default: ()=> Date.now()
        },
        updatedAt:
        {
            type: Date,
            default: ()=> Date.now()
        }
    }
)

statiscticsSchema.pre('save', function(next)
{
    this.updatedAt = () => Date.now()
    next()

})


module.exports = mongoose.model("Statistics", statiscticsSchema);

