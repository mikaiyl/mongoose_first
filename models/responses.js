const mongoose = require('mongoose')

const Response = mongoose.model( 'Responses', {
    name: String,
    email: String,
    response: Boolean,
    number: Number,
} )

module.exports = Response
