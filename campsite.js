//where we define mongoose schema and the model for all documents in our databases campsite collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//used for documents storing comments about a campsite
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5, 
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    //allows every campsite document to be able to contain multiple comment documents stored in an array
    comments: [commentSchema]
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema)
//creates model named Campsites, first argument should be Capitalized and singular

module.exports = Campsite;