const mongoose = require('mongoose')

const TreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    born: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    specie: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Trees', TreeSchema, 'trees')
