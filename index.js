const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.error(err);
    });



//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);





app.listen(5000, () => {
    console.log('Backend server is running')
})