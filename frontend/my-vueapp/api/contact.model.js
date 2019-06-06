// contact schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    first: {
        type: String
    },
    last: {
        type: String
    },
    number: {
        type: String
    }
},{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', Contact);