const mongoose = require('mongoose')
const connectString = process.env.MONGODB_CONNECT_URI
mongoose.connect(connectString).then(() => {
    console.log("___MongoDB Atls Connected");
}).catch((err) => {
    console.log(`____MongoDB Atlas Failed____${err}`);
})

// mongoose.connect('mongodb://127.0.0.1:27017/movieBooking').then(() => {
//         console.log("___MongoDB Compass Connected");
//     }).catch((err) => {
//         console.log(`____MongoDB Compass Failed____${err}`);
//     })

