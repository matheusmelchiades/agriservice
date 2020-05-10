const mongoose = require('mongoose')

const SpecieSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Trees', SpecieSchema, 'trees')
