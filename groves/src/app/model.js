const mongoose = require('mongoose')

const GroveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    trees: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('Specie', GroveSchema, 'species')
