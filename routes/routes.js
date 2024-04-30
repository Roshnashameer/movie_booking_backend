const express = require('express')

// router object
const router = new express.Router()
const user=require('../controllers/userController')
const { jwtMiddleware } =require('../middlewares/jwtMiddleware')
// const { createUser, loginUser } = require('../middlewares/validationMiddleware')

// User creation
router.post('/signup',user.signUp)
// login
router.post('/signin',user.login)
// get movies
router.get('/movies',user.getAllMovies)
// add new booking
router.post('/add-booking/:movieId',jwtMiddleware,user.addBooking)
// view Seat
router.get('/seat/:id',jwtMiddleware,user.viewSeat)
// view bookings
router.get('/view-bookings',jwtMiddleware,user.viewBooking)
module.exports=router