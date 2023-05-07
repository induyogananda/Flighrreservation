const exp = require("express")
const flightApi = exp.Router();
flightApi.use(exp.json())
const expressErrorHandler = require("express-async-handler")

//get products
flightApi.get("/getflight", expressErrorHandler(async (req, res, next) => {
    let airlineCollectionObject = req.app.get("airlineCollectionObject");
    let flights = await airlineCollectionObject.find().toArray();
    res.send({ message: flights })
}))


//export
module.exports = flightApi;