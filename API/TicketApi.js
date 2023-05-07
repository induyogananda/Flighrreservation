const exp = require("express")
const ticketApi = exp.Router();
ticketApi.use(exp.json())
const expressErrorHandler = require("express-async-handler")
const multerObj = require("./middlewares/addfile")


ticketApi.post('/createticket', multerObj.single('photo'), expressErrorHandler(async (req, res, next) => {

    let flightticketCollectionObject = req.app.get("flightticketCollectionObject")

    const newTicket = JSON.parse(req.body.ticketObj);

    newTicket.ticketImage = req.file.path;
    let ticket = await flightticketCollectionObject.insertOne(newTicket)
    res.send({message:"ticket added"})


}))

ticketApi.get('/getticket',expressErrorHandler(async(req,res,next)=>{
    let flightticketCollectionObject = req.app.get("flightticketCollectionObject")
    let ticket = await  flightticketCollectionObject.find().toArray();
    res.send({ message: ticket })
}))

module.exports=ticketApi;