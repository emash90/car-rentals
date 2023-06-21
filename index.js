const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const redis = require('ioredis');



const RedisStore = require("connect-redis")(session);

//create redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    no_ready_check: true,
});

redisClient.on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', (err) => {
    console.log('Connected to redis successfully');
});

//create session
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,

    cookie: {
        resave: false,
        saveUninitialized: false,
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 10, // 10 minutes
    },
}));


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/users', require('./backend/routes/userRoutes'));
app.use('/cars', require("./backend/routes/carRoutes"));
app.use('/orders', require('./backend/routes/orderRoutes'));


//connect to mongoDB

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

