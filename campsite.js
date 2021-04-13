//where we define mongoose schema and the model for all documents in our databases campsite collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema)
//creates model named Campsites, first argument should be Capitalized and singular

module.exports = Campsite;