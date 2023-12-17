const mongoose = require('mongoose')

const astroSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    gender: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },
    languages: {
        type: [String],
        default: [],
        require: true,
    },
    specialties: {
        type: [String],
        default: [],
        require: true,
    }


})

const Astrologer = mongoose.model('Astrologer', astroSchema);

module.exports = Astrologer;