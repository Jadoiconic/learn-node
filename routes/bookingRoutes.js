const express = require("express")

const { getCheckOutSession } = require("../controllers/bookingController")


const bookingRouter = express.Router()

bookingRouter.get("/checkout/:tourId",getCheckOutSession)

module.exports = bookingRouter