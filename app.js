const PORT = process.env.PORT || 9000
const dbpath = 'mongodb://localhost:27017/rsvp'

// express config
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))

app.set( 'view engine', 'pug' )
app.set( 'views', './pug' )

// mongoose config
const mongoose = require('mongoose')
mongoose.connect( dbpath, { useNewUrlParser: true } )
const Response = require( './models/responses.js' )


// Get site root
app.get( '/', ( req, res ) => {
    res.render( 'main' )
} )

// Get response list
app.get( '/guests', ( req, res ) => {
    Response.find( ( err, guestsList ) => {
        if ( err ) {
            res.render( err )
        } else if ( guestsList.length ) {
            res.render( 'guests', {
                guestsList: guestsList
            } )
        } else {
            res.send( 'responses not found' )
        }
    } )
} )

// accept posts
app.post( '/reply', ( req, res ) => {
    let responseInfo = {
        name: req.body.name,
        email: req.body.email,
        response: req.body.opts == 0,
        number: Number( req.body.number )
    }

    let response = new Response( responseInfo )
    response.save()

    res.render( 'reply' )
} )

// server listen on PORT
app.listen( PORT )
