const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 15
    },
    status: {
        type: String,
        enum: ['done' , 'in progress'],
        default: 'in progress'
    }
})

const model = mongoose.model('Todo',schema)

module.exports = model