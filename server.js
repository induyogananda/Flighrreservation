//create express app
const exp = require('express')
const app = exp();
const path = require("path")
require('dotenv').config()
const cors=require("cors")
app.use(cors())

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
})
//connecting build of react with current server
app.use(exp.static(path.join(__dirname, './build/')))
//import apis
const flightApi = require("./API/FlightApi")
const ticketApi = require("./API/TicketApi")
//db connectivity
//import mongo client
const mongoClient = require("mongodb").MongoClient;
//db connection url
const dburl = process.env.DATABASE_URL;
//connect with mongodb server
mongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("err in db connect ", err)
    }
    else {
        //create database object
        let databaseObject = client.db("Airlines")
        //create user collection object
        let airlineCollectionObject = databaseObject.collection("airlinecollection")
        let flightticketCollectionObject = databaseObject.collection("ticketcollection")
        //sharing collection object
        app.set("airlineCollectionObject", airlineCollectionObject)
        app.set("flightticketCollectionObject", flightticketCollectionObject)
        console.log("DB connection success")
    }
})
//execute specific api based on path
app.use('/flight', flightApi)
app.use('/ticket',ticketApi)


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})


//handle invalid path
app.use((req, res, next) => {
    res.send({ message: `path ${req.url} is invalid` })
})
//handle errors
app.use((err, req, res, next) => {
    console.log(err)
    res.send({ message: err.message })

})
//assign port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server listening on port ${port}..`))