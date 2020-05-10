const mongoose = require('mongoose')

const HarvestSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    grossWeight: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    trees: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('Harvest', HarvestSchema, 'harvests')
