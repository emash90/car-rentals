const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/users', require('./backend/routes/userRoutes'));
app.use('/cars', require("./backend/routes/carRoutes"));
//app.use('/orders', require('./routes/orders'));


const connect_with_retry = () => {
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected, yay!!!'))
.catch((err) => {
console.log(`MongoDB connection error: ${err}`);
setTimeout(connect_with_retry, 5000);
});
}

connect_with_retry();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

