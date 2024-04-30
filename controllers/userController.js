const booking = require("../models/bookingSchema");
const movies = require("../models/movieModel")
const users = require("../models/userModel")

const jwt = require('jsonwebtoken');
exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User already exisits.");
        } else {
            const newUser = new users({
                userName, email, password
            });

            await newUser.save();
            return res.status(200).json(newUser );
        }
    } catch (err) {
        return res.status(500).json(`Create API failed: ${err}`);
    }
};
//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            const token = jwt.sign({ _id: existUser._id, role: existUser.role }, "supersecretkey123");
            // console.log(token);

            return res.status(200).json({
                user: existUser,
                token
            });

        } else {
            return res.status(404).json("Incorrect email and password");
        }
    } catch (err) {
        return res.status(500).json(`Login API failed: ${err}`);
    }
};
// get all movies
exports.getAllMovies = async (req, res) => {

    const allMovies = await movies.find()
    res.status(200).json(allMovies)

}
// movie by id
exports.getMovie = async (req, res) => {
    try {

        const { _id } = req.params
        const movie = await movies.findById(id);
        res.send(movie);
        // console.log(user)

    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }


};

// add booking
exports.addBooking = async (req, res) => {
    const { seatNum } = req.body
    const { movieId } = req.params
    // useId
    const id = req.payload
    try {

        const existingBookings = await booking.find({ userId: id });
        // console.log(existingBookings);
        if (existingBookings.length > 0) {
            const moviesBooked = existingBookings.map(booking => booking.movieId);
            if (moviesBooked.includes(movieId)) {
                return res.status(400).json({ msg: "Booking the same movie again is not possible." });
            }
        }

        const newBooking = new booking({ userId: id, movieId, seatNum });
        await newBooking.save();
        return res.status(200).json({ msg: "Booked Successfully" ,data:newBooking});


    }
    catch (err) {
        return res.status(401).json(`Add booking API failed: ${err}`);
    }
}
// seat view
exports.viewSeat = async (req, res) => {
    const { id } = req.params
   

    try {
        const existingBookings = await booking.find({ movieId: id });
        // console.log(existingBookings);
        if (existingBookings.length > 0) {
            const seatNumbers = existingBookings.map(i => i.seatNum);
            return res.status(200).json(seatNumbers);
        }
        else {
            return res.status(200).json({ msg: "no reserverseats" });
        }

    }
    catch (err) {
        return res.status(401).json(` seat view API failed: ${err}`);
    }

}
// view user bookings
exports.viewBooking = async (req, res) => {
    const  id  = req.payload
    try {
        const existingBookings = await booking.find({ userId: id });

        if (existingBookings.length > 0) {
            const bookingsWithMovieNames = [];
            for (const bookingItem of existingBookings) {
                const movie = await movies.findById(bookingItem.movieId); // Fetching movie details based on movieId
                if (movie) {
                    bookingsWithMovieNames.push({
                        movieName: movie.title, 
                        seatNumbers: bookingItem.seatNum 
                    });
                }
            }
            // console.log(bookingsWithMovieNames);
            return res.status(200).json(bookingsWithMovieNames);
        } else {
            return res.status(200).json({ msg: "No Bookings" });
        }
    } catch (err) {
        return res.status(401).json(`User booking view API failed: ${err}`);
    }
    
  

}